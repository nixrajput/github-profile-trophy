import { CacheManager } from "./cache_manager.ts";
import { StaticRegenerationOptions } from "./types.ts";
import { getUrl, hashString, readCache } from "./utils.ts";

export async function staticRenderRegeneration(
  request: Request,
  options: StaticRegenerationOptions,
  render: (request: Request) => Promise<Response>,
) {
  // avoid TypeError: Invalid URL at deno:core
  const url = getUrl(request);

  // A cache hit below is replayed with options.headers, which is the SVG content
  // type. Anything that is not an SVG has to bypass the cache or it gets served
  // as image/svg+xml: the favicon, and the landing page shown when no username
  // is given. The CDN still caches both via Cache-Control.
  const skipCache = url.pathname === "/favicon.ico" ||
    !url.searchParams.get("username");
  if (skipCache) {
    return await render(request);
  }

  const cacheFile = await hashString(url.pathname + (url.search ?? ""));
  const cacheManager = new CacheManager(options.revalidate ?? 0, cacheFile);
  if (cacheManager.isCacheValid) {
    const cache = readCache(cacheManager.cacheFilePath);
    if (cache !== null) {
      return new Response(cache, {
        headers: options.headers ?? new Headers({}),
      });
    }
  }

  const response = await render(request);

  if (response.status >= 200 && response.status < 300) {
    void cacheManager.save(response);
  }

  return response;
}
