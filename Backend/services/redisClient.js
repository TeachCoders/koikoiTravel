import { createClient } from "redis";
import { logger } from "../utils/logger.js";

/**
 * Shared Redis client for response caching.
 *
 * Fail-open design: if Redis is unreachable the app keeps working normally
 * (no caching) and recovers automatically once Redis is back.
 */
const redis = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  database: Number(process.env.REDIS_DB || 0) || 0,
});

redis.on("error", (err) => {
  logger.warn(`[redis] connection error: ${err.message}`);
});

redis.on("reconnecting", () => logger.warn("[redis] reconnecting..."));
redis.on("ready", () => logger.info("[redis] connected"));
redis.on("end", () => logger.warn("[redis] connection closed"));

try {
  await redis.connect();
} catch (err) {
  logger.warn(`[redis] initial connect failed (caching disabled): ${err.message}`);
}

export function redisReady() {
  return redis.isReady === true;
}

export async function cacheGet(key) {
  if (!redisReady()) return null;
  try {
    return await redis.get(`koikoi:http:${key}`);
  } catch (err) {
    logger.warn(`[redis] cacheGet failed: ${err.message}`);
    return null;
  }
}

export async function cacheSet(key, value, ttlSeconds) {
  if (!redisReady()) return;
  try {
    await redis.set(`koikoi:http:${key}`, value, { EX: ttlSeconds });
  } catch (err) {
    logger.warn(`[redis] cacheSet failed: ${err.message}`);
  }
}

const toCacheKeys = (item) => {
  const arr = (Array.isArray(item) ? item : [item]).flat();
  return arr.filter((k) => typeof k === "string" && k.length > 0);
};

export async function cacheClear(prefix) {
  if (!redisReady()) return;
  try {
    const match = `koikoi:http:${prefix}*`;
    for await (const item of redis.scanIterator({ MATCH: match, COUNT: 200 })) {
      const keys = toCacheKeys(item);
      if (keys.length) await redis.del(...keys);
    }
  } catch (err) {
    logger.warn(`[redis] cacheClear failed: ${err.message}`);
  }
}

export async function cacheClearAll() {
  if (!redisReady()) return;
  try {
    for await (const item of redis.scanIterator({ MATCH: "koikoi:http:*", COUNT: 200 })) {
      const keys = toCacheKeys(item);
      if (keys.length) await redis.del(...keys);
    }
  } catch (err) {
    logger.warn(`[redis] cacheClearAll failed: ${err.message}`);
  }
}

export default redis;