import { Soxa as ServiceProvider } from "https://deno.land/x/soxa@1.4/src/core/Soxa.ts";
import { defaults } from "https://deno.land/x/soxa@1.4/src/defaults.ts";

// v0.32.4 is the newest redis without jsr: imports, which fail on vercel-deno (see api/index.ts).
export {
  type Bulk,
  connect,
  type Redis,
} from "https://deno.land/x/redis@v0.32.4/mod.ts";

import { CONSTANTS } from "./src/utils.ts";

const baseURL = Deno.env.get("GITHUB_API") || CONSTANTS.DEFAULT_GITHUB_API;

const soxa = new ServiceProvider({
  ...defaults,
  baseURL,
});

export { soxa };
