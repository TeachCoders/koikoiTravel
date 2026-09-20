import { isPublicRequest } from "../utils/authHelpers.js";
import { cacheGet as redisCacheGet, cacheSet, redisReady, cacheClearAll } from "./redisClient.js";

const DEFAULT_TTL = Number(process.env.REDIS_CACHE_TTL || 60) || 60;

/**
 * Cache GET responses for public (unauthenticated) requests.
 *
 * - Skips non-GET requests, staff/dashboard requests and error responses.
 * - Fail-open: both missing Redis and any error fall through to `next()`
 *   so the API behaves as before.
 * - Keyed by the full path + query so `?limit`, `?isActive` etc. are separate.
 * - Uses a best-effort `res.json` interception so the router does not need
 *   any changes.
 *
 * Usage:
 *   app.use("/state", cacheGet(60), stateRouter);
 */
export function cacheGet(ttl = DEFAULT_TTL) {
  return async (req, res, next) => {
    try {
      if (req.method !== "GET" || !isPublicRequest(req) || !redisReady()) return next();

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
 * Flushes the whole public response cache on any write request.
 *
 * Mount globally (before routers) once — any POST/PUT/PATCH/DELETE invalidates
 * every cached public GET so admin/dashboard edits reflect on the site
 * immediately instead of waiting for the TTL to expire.
 */
export function clearCacheOnWrite() {
  return async (req, res, next) => {
    if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") return next();
    try {
      await cacheClearAll();
    } catch (err) {
      console.error("[httpCache] clearCacheOnWrite error:", err.message);
    }
    return next();
  };
}