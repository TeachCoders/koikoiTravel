import { isPublicRequest } from "../utils/authHelpers.js";
import { cacheGet as redisCacheGet, cacheSet, redisReady, cacheClearAll } from "./redisClient.js";
import { notifyRevalidate } from "./revalidateService.js";

const DEFAULT_TTL = Number(process.env.REDIS_CACHE_TTL || 60) || 60;

/**
 * Cache GET responses for public (unauthenticated) requests.
 *
 * - Skips non-GET requests, logged-in/staff requests, no-cache headers, and error responses.
 * - Fail-open: both missing Redis and any error fall through to `next()`
 * - Keyed by the full path + query.
 */
export function cacheGet(ttl = DEFAULT_TTL) {
  return async (req, res, next) => {
    try {
      const isNoCacheHeader = req.headers["cache-control"]?.includes("no-cache") || req.headers["cache-control"]?.includes("no-store");
      const isBypassQuery = req.query.nocache === "true" || req.query.preview === "true" || req.query.fresh === "true";

      // If non-GET, or logged-in staff/admin user, or no-cache header/query -> BYPASS REDIS CACHE
      if (req.method !== "GET" || !isPublicRequest(req) || isNoCacheHeader || isBypassQuery || !redisReady()) {
        res.set("X-Koikoi-Cache", "BYPASS");
        return next();
      }

      const key = req.originalUrl;
      const hit = await redisCacheGet(key);
      if (hit !== null) {
        res.set("Content-Type", "application/json; charset=utf-8");
        res.set("Cache-Control", `public, s-maxage=${ttl}, stale-while-revalidate=${ttl}`);
        res.set("X-Koikoi-Cache", "HIT");
        return res.send(hit);
      }

      const json = res.json.bind(res);
      res.set("X-Koikoi-Cache", "MISS");

      res.json = (body) => {
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 400) {
          void cacheSet(key, JSON.stringify(body), ttl).catch((err) => {
            console.error("[httpCache] cacheSet error:", err.message);
          });
        }
        return json(body);
      };

      return next();
    } catch (err) {
      console.error("[httpCache] cacheGet error:", err.message);
      return next();
    }
  };
}

export { cacheClear } from "./redisClient.js";

/**
 * Flushes the whole public response cache on any write request (POST, PUT, PATCH, DELETE).
 * Runs AFTER the database write has completed (res.on("finish")).
 */
export function clearCacheOnWrite() {
  return async (req, res, next) => {
    if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") return next();

    res.on("finish", async () => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        try {
          await cacheClearAll();
          notifyRevalidate("global", {});
        } catch (err) {
          console.error("[httpCache] clearCacheOnWrite error:", err.message);
        }
      }
    });

    return next();
  };
}