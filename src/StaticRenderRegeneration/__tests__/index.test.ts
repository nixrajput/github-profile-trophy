import { assertEquals } from "@std/assert";
import { assertSpyCalls, stub } from "@std/testing/mock";
import { CacheManager } from "../cache_manager.ts";
import { staticRenderRegeneration } from "../index.ts";

const cardHeaders = new Headers({
  "Content-Type": "image/svg+xml",
  "Cache-Control": "public, max-age=86400",
});

async function renderWith(headers: Headers) {
  const save = stub(CacheManager.prototype, "save", () => Promise.resolve());
  try {
    const response = await staticRenderRegeneration(
      new Request("http://localhost/?username=test"),
      { revalidate: 1000, headers: cardHeaders },
      () => Promise.resolve(new Response("<svg/>", { headers })),
    );
    return { response, save };
  } finally {
    save.restore();
  }
}

Deno.test("staticRenderRegeneration caches a card served with its headers", async () => {
  const { save } = await renderWith(cardHeaders);
  assertSpyCalls(save, 1);
});

Deno.test("staticRenderRegeneration skips a 2xx with a shorter Cache-Control", async () => {
  const { response, save } = await renderWith(
    new Headers({
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=300",
    }),
  );
  assertSpyCalls(save, 0);
  assertEquals(response.headers.get("Cache-Control"), "public, max-age=300");
});
