import Redis from 'ioredis';
import { env } from './env';
import { logger } from './logger';

let redis: Redis | null = null;

/**
 * Returns the ioredis singleton, creating it if necessary.
 * retryStrategy caps reconnect attempts so the console is not flooded in dev
 * when Redis is unavailable.
 */
export function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null, // required by BullMQ workers
      lazyConnect: true,
      // In non-production: give up after 1 reconnect attempt (prevents log flood).
      // In production: exponential back-off up to 30 s.
      retryStrategy: (times: number) => {
        if (env.NODE_ENV !== 'production') {
          return times >= 1 ? null : 500;
        }
        return Math.min(times * 2000, 30000);
      },
    });

    redis.on('error', (err) => logger.error('Redis error', err));
    redis.on('connect', () => logger.info('Redis connected'));
  }
  return redis;
}

/**
 * Attempts to connect to Redis and verifies connectivity with a PING.
 * Returns true  → Redis is up; callers may start BullMQ workers.
 * Returns false → Redis is unavailable; workers are skipped.
 * Throws in production so the process fails fast.
 */
export async function connectRedis(): Promise<boolean> {
  try {
    const client = getRedis();
    if (client.status !== 'ready') {
      await client.connect();
    }
    // Verify the connection is genuinely usable.
    await client.ping();
    return true;
  } catch (err) {
    // Clean up the failed client so its internal reconnect timer is cancelled.
    if (redis) {
      redis.disconnect(false);
      redis = null;
    }
    if (env.NODE_ENV === 'production') {
      throw err;
    }
    logger.warn(
      'Redis unavailable — BullMQ workers and in-memory caching are disabled for this session. ' +
      `Start Redis on ${env.REDIS_URL} and restart the server to enable them.`
    );
    return false;
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const data = await getRedis().get(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
  try {
    await getRedis().setex(key, ttlSeconds, JSON.stringify(value));
  } catch {
    // Cache is optional — continue without Redis
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    await getRedis().del(key);
  } catch {
    // Cache is optional
  }
}
