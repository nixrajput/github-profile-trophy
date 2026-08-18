export class CustomURLSearchParams extends URLSearchParams {
  getStringValue(key: string, defaultValue: string): string {
    if (super.has(key)) {
      const param = super.get(key);
      if (param !== null) {
        return param.toString();
      }
    }
    return defaultValue.toString();
  }
  getNumberValue(key: string, defaultValue: number): number {
    if (super.has(key)) {
      const param = super.get(key);
      if (param !== null) {
        const parsedValue = parseInt(param);
        if (isNaN(parsedValue)) {
          return defaultValue;
        }
        return parsedValue;
      }
    }
    return defaultValue;
  }
  getBooleanValue(key: string, defaultValue: boolean): boolean {
    if (super.has(key)) {
      const param = super.get(key);
      return param !== null && param.toString() === "true";
    }
    return defaultValue;
  }
}

export function parseParams(req: Request): CustomURLSearchParams {
  const splittedURL = req.url.split("?");
  if (splittedURL.length < 2) {
    return new CustomURLSearchParams();
  }
  return new CustomURLSearchParams(splittedURL[1]);
}

export function abridgeScore(score: number): string {
  if (Math.abs(score) < 1) {
    return "0pt";
  }
  if (Math.abs(score) > 999) {
    return (Math.sign(score) * (Math.abs(score) / 1000)).toFixed(1) + "kpt";
  }
  return (Math.sign(score) * Math.abs(score)).toString() + "pt";
}

const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

// One profile's trophies do not change meaningfully within a day, so every layer
// is pinned to 24 hours: a fresh GitHub query per user per day, and cached hits
// for the rest. Keeps the API well clear of the rate limit.
const DAY_IN_SECONDS = 24 * 60 * 60;

export const CONSTANTS = {
  CACHE_MAX_AGE: DAY_IN_SECONDS,
  CDN_CACHE_MAX_AGE: DAY_IN_SECONDS,
  STALE_WHILE_REVALIDATE: DAY_IN_SECONDS, // serve stale for a day while revalidating
  DEFAULT_PANEL_SIZE: 110,
  DEFAULT_MAX_COLUMN: 8,
  DEFAULT_MAX_ROW: 3,
  DEFAULT_MARGIN_W: 0,
  DEFAULT_MARGIN_H: 0,
  DEFAULT_NO_BACKGROUND: false,
  DEFAULT_NO_FRAME: false,
  DEFAULT_GITHUB_API: "https://api.github.com/graphql",
  DEFAULT_GITHUB_RETRY_DELAY: 500,
  REVALIDATE_TIME: HOUR_IN_MILLISECONDS * 24,
  REDIS_TTL: HOUR_IN_MILLISECONDS * 24,
};

export enum RANK {
  SECRET = "SECRET",
  SSS = "SSS",
  SS = "SS",
  S = "S",
  AAA = "AAA",
  AA = "AA",
  A = "A",
  B = "B",
  C = "C",
  UNKNOWN = "?",
}

export const RANK_ORDER = Object.values(RANK);
