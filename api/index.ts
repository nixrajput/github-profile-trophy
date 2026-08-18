import { Card } from "../src/card.ts";
import { CONSTANTS, parseParams } from "../src/utils.ts";
import { COLORS, Theme } from "../src/theme.ts";
// Fully qualified on purpose: vercel-deno resolves imports at runtime and does not
// apply deno.json's import map, so the bare "@std/dotenv/load" specifier throws
// ERR_MODULE_NOT_FOUND on cold start and takes the whole function down.
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { staticRenderRegeneration } from "../src/StaticRenderRegeneration/index.ts";
import { GithubRepositoryService } from "../src/Repository/GithubRepository.ts";
import { GithubApiService } from "../src/Services/GithubApiService.ts";
import { ServiceError } from "../src/Types/index.ts";
import { ErrorPage } from "../src/pages/Error.ts";
import { cacheProvider } from "../src/config/cache.ts";

const serviceProvider = new GithubApiService();
const client = new GithubRepositoryService(serviceProvider).repository;

// Build cache control header with optimized caching strategy
const cacheControlHeader = [
  "public",
  `max-age=${CONSTANTS.CACHE_MAX_AGE}`,
  `s-maxage=${CONSTANTS.CDN_CACHE_MAX_AGE}`,
  `stale-while-revalidate=${CONSTANTS.STALE_WHILE_REVALIDATE}`,
].join(", ");

const HOME_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>github-profile-trophy</title>
<meta name="description" content="Self-hosted GitHub profile trophy card service.">
<meta name="color-scheme" content="dark">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2796%27%20height%3D%2796%27%20viewBox%3D%270%200%2032%2032%27%3E%20%3Ctitle%3Egithub-profile-trophy%3C%2Ftitle%3E%20%3Crect%20width%3D%2732%27%20height%3D%2732%27%20rx%3D%277%27%20fill%3D%27%23141118%27%20%2F%3E%20%3C%21--%20A%20cup%20earned%20by%20rank%2C%20which%20is%20what%20the%20service%20grades%3A%20the%20bowl%20is%20filled%20violet%20because%20a%20trophy%20is%20awarded%2C%20not%20attempted.%20Amber%20handles%20carry%20the%20accent%20rather%20than%20a%20star%20or%20a%20%271%27%2C%20both%20of%20which%20stop%20reading%20at%20favicon%20size.%20--%3E%20%3Cpath%20d%3D%27M11%207h10v5.5a5%205%200%200%201-10%200Z%27%20fill%3D%27%239b8cff%27%20%2F%3E%20%3Cpath%20d%3D%27M11%208.5H8.5v2a3%203%200%200%200%203%203M21%208.5h2.5v2a3%203%200%200%201-3%203%27%20fill%3D%27none%27%20stroke%3D%27%23f0a868%27%20stroke-width%3D%272%27%20stroke-linecap%3D%27round%27%20%2F%3E%20%3Cpath%20d%3D%27M16%2017.5v4%27%20stroke%3D%27%239b8cff%27%20stroke-width%3D%272.4%27%20stroke-linecap%3D%27round%27%20%2F%3E%20%3Crect%20x%3D%2710.5%27%20y%3D%2721.5%27%20width%3D%2711%27%20height%3D%273.2%27%20rx%3D%271.6%27%20fill%3D%27%23e9e6ef%27%20%2F%3E%20%3C%2Fsvg%3E">
<style>*{box-sizing:border-box}
:root{--bg:#100f15;--surface:#191822;--line:#2b2836;--text:#e9e6ef;--dim:#9a93ad;--violet:#9b8cff;--amber:#f0a868;
--mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace;
--sans:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
html{color-scheme:dark}
body{margin:0;background:var(--bg);color:var(--text);font:15px/1.6 var(--sans);
padding:clamp(2rem,7vw,4.5rem) 1.25rem 5rem;-webkit-font-smoothing:antialiased}
main{max-width:44rem;margin:0 auto}
.mark{display:block;width:64px;height:64px;margin:0 0 1.5rem}
h1{font:700 clamp(1.35rem,4.5vw,1.9rem)/1.1 var(--mono);letter-spacing:-.02em;margin:0 0 .5rem;word-break:break-word}
.tag{color:var(--dim);margin:0 0 2.5rem;max-width:34rem}
.demo{margin:0 0 2.5rem;padding:0}
.demo img{display:block;max-width:100%;height:auto;border-radius:6px}
.demo figcaption{margin-top:.85rem}
.url{display:block;overflow-x:auto;white-space:nowrap;background:var(--surface);border:1px solid var(--line);
border-radius:5px;padding:.65rem .8rem;font:12.5px/1.5 var(--mono);color:var(--dim)}
.url b{color:var(--amber);font-weight:400}
h2{font:600 .72rem/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--violet);
margin:0 0 .9rem}
section{margin:0 0 2.5rem}
dl{display:grid;grid-template-columns:auto 1fr;gap:.5rem 1.1rem;margin:0;font-size:14px}
dt{font:400 13px/1.6 var(--mono);color:var(--amber)}
dd{margin:0;color:var(--dim)}
footer{border-top:1px solid var(--line);padding-top:1.25rem;color:var(--dim);font-size:13.5px}
a{color:var(--violet);text-underline-offset:3px}
a:focus-visible{outline:2px solid var(--violet);outline-offset:3px;border-radius:2px}
.note{color:var(--dim);font-size:13.5px;margin:.6rem 0 0}
@media(max-width:30rem){dl{grid-template-columns:1fr;gap:.15rem}dd{margin-bottom:.6rem}}</style>
</head>
<body>
<main>
  <svg class="mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 32 32">
  <title>github-profile-trophy</title>
  <rect width="32" height="32" rx="7" fill="#141118" />
  <!-- A cup earned by rank, which is what the service grades: the bowl is filled violet
       because a trophy is awarded, not attempted. Amber handles carry the accent rather
       than a star or a "1", both of which stop reading at favicon size. -->
  <path d="M11 7h10v5.5a5 5 0 0 1-10 0Z" fill="#9b8cff" />
  <path d="M11 8.5H8.5v2a3 3 0 0 0 3 3M21 8.5h2.5v2a3 3 0 0 1-3 3" fill="none" stroke="#f0a868" stroke-width="2" stroke-linecap="round" />
  <path d="M16 17.5v4" stroke="#9b8cff" stroke-width="2.4" stroke-linecap="round" />
  <rect x="10.5" y="21.5" width="11" height="3.2" rx="1.6" fill="#e9e6ef" />
</svg>
  <h1>github-profile-trophy</h1>
  <p class="tag">Renders a trophy case of GitHub profile ranks as an SVG, for embedding in a README.</p>

  <figure class="demo">
    <img src="/?username=nixrajput&amp;column=4&amp;row=1&amp;theme=onedark&amp;no-bg=true&amp;no-frame=true" alt="Example trophy row for nixrajput" loading="eager">
    <figcaption><code class="url">https://github-profile-trophy.nixrajput.com/?<b>username</b>=nixrajput&amp;column=4&amp;row=1&amp;theme=onedark&amp;no-bg=true</code></figcaption>
  </figure>

  <section>
    <h2>Parameters</h2>
    <dl>
      <dt>username</dt><dd>GitHub username. Required.</dd>
      <dt>theme</dt><dd>One of 24 themes, e.g. <code>onedark</code>.</dd>
      <dt>row / column</dt><dd>Grid size of the trophy case.</dd>
      <dt>no-bg</dt><dd><code>true</code> for a transparent background.</dd>
      <dt>no-frame</dt><dd><code>true</code> to drop the panel borders.</dd>
      <dt>title</dt><dd>Comma-separated trophies to keep.</dd>
    </dl>
  </section>

  <footer>
    Self-hosted instance, restricted to whitelisted usernames.
    <a href="https://github.com/nixrajput/github-profile-trophy">Source and full options on GitHub</a>.
    <p class="note">Not on the list? Deploy your own from the repo - it is MIT licensed.</p>
  </footer>
</main>
</body>
</html>`;

const defaultHeaders = new Headers(
  {
    "Content-Type": "image/svg+xml",
    "Cache-Control": cacheControlHeader,
  },
);

export default (request: Request) =>
  staticRenderRegeneration(request, {
    revalidate: CONSTANTS.REVALIDATE_TIME,
    headers: defaultHeaders,
  }, function (req: Request) {
    return app(req);
  });

async function app(req: Request): Promise<Response> {
  const params = parseParams(req);
  const username = params.get("username");
  const row = params.getNumberValue("row", CONSTANTS.DEFAULT_MAX_ROW);
  const column = params.getNumberValue("column", CONSTANTS.DEFAULT_MAX_COLUMN);
  const themeParam: string = params.getStringValue("theme", "default");
  if (username === null) {
    // Landing page rather than a 400: the bare host is a URL someone visits on
    // purpose, and a rendered example plus the parameter list is more use than
    // an error telling them what they already know.
    return new Response(
      HOME_PAGE,
      {
        status: 200,
        headers: new Headers({
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": cacheControlHeader,
        }),
      },
    );
  }
  // Unset WHITELIST leaves the instance open, which is how upstream ships it.
  // This deployment sets it so the service is not free hosting for every other
  // profile on GitHub. Comma-separated, so it can be extended without a deploy.
  const whitelist = (Deno.env.get("WHITELIST") ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0);
  if (whitelist.length > 0 && !whitelist.includes(username.toLowerCase())) {
    // 200 with an SVG, not a 403: this renders inside a README <img>, and a 403
    // shows a broken-image icon with no explanation. Matches how the stats and
    // streak services refuse a non-whitelisted user.
    const safe = username.replace(/[&<>"']/g, "");
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="90" viewBox="0 0 500 90" role="img" aria-label="Username not whitelisted">
  <rect x="0.5" y="0.5" width="499" height="89" rx="6" fill="#141118" stroke="#3d3950"/>
  <text x="24" y="36" fill="#f0a868" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="15" font-weight="600">Username not whitelisted</text>
  <text x="24" y="60" fill="#9a93ad" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="12.5">"${safe}" is not permitted on this instance.</text>
  <text x="24" y="78" fill="#6b6478" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="11.5">Deploy your own: github.com/nixrajput/github-profile-trophy</text>
</svg>`,
      {
        status: 200,
        headers: new Headers({
          "Content-Type": "image/svg+xml",
          "Cache-Control": cacheControlHeader,
        }),
      },
    );
  }
  let theme: Theme = COLORS.default;
  if (Object.keys(COLORS).includes(themeParam)) {
    theme = COLORS[themeParam];
  }
  const marginWidth = params.getNumberValue(
    "margin-w",
    CONSTANTS.DEFAULT_MARGIN_W,
  );
  const paddingHeight = params.getNumberValue(
    "margin-h",
    CONSTANTS.DEFAULT_MARGIN_H,
  );
  const noBackground = params.getBooleanValue(
    "no-bg",
    CONSTANTS.DEFAULT_NO_BACKGROUND,
  );
  const noFrame = params.getBooleanValue(
    "no-frame",
    CONSTANTS.DEFAULT_NO_FRAME,
  );
  const titles: Array<string> = params.getAll("title").flatMap((r) =>
    r.split(",")
  ).map((r) => r.trim());
  const ranks: Array<string> = params.getAll("rank").flatMap((r) =>
    r.split(",")
  ).map((r) => r.trim());

  const userKeyCache = ["v1", username].join("-");
  const userInfoCached = await cacheProvider.get(userKeyCache) || "{}";
  let userInfo = JSON.parse(userInfoCached);
  const hasCache = !!Object.keys(userInfo).length;

  if (!hasCache) {
    const userResponseInfo = await client.requestUserInfo(username);
    if (userResponseInfo instanceof ServiceError) {
      return new Response(
        ErrorPage({ error: userResponseInfo }).render(),
        {
          status: userResponseInfo.code,
          headers: new Headers({
            "Content-Type": "text/html",
            "Cache-Control": cacheControlHeader,
          }),
        },
      );
    }
    userInfo = userResponseInfo;
    await cacheProvider.set(userKeyCache, JSON.stringify(userInfo));
  }
  // Success Response
  return new Response(
    new Card(
      titles,
      ranks,
      column,
      row,
      CONSTANTS.DEFAULT_PANEL_SIZE,
      marginWidth,
      paddingHeight,
      noBackground,
      noFrame,
    ).render(userInfo, theme),
    {
      headers: defaultHeaders,
    },
  );
}
