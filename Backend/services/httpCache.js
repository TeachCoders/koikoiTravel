import { isPublicRequest } from "../utils/authHelpers.js";
import { cacheGet as redisCacheGet, cacheSet, redisReady } from "./redisClient.js";

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
      res.json = (body) => {
        json(body);
        if (res.statusCode >= 200 && res.statusCode < 400) {
          cacheSet(key, JSON.stringify(body), ttl);
        } else {
          res.set("X-Koikoi-Cache", "SKIP");
        }
        return res;
      };
      res.set("X-Koikoi-Cache", "MISS");
      return next();
    } catch (err) {
      console.error("[httpCache] cacheGet error:", err.message);
      return next();
    }
  };
}

export { cacheClear } from "./redisClient.js";