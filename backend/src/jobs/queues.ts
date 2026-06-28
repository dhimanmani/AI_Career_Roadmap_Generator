import { Queue } from 'bullmq';
import { env } from '../config/env';
import { logger } from '../config/logger';

/**
 * BullMQ queue connection options.
 *
 * enableOfflineQueue: false → queue.add() rejects immediately when Redis is
 *   down instead of silently buffering jobs that will never be delivered.
 * retryStrategy: limits reconnect noise in development.
 */
const connection = {
  url: env.REDIS_URL,
  enableOfflineQueue: false,
  retryStrategy: (times: number) => {
    if (env.NODE_ENV !== 'production') {
      return times >= 1 ? null : 500;
    }
    return Math.min(times * 2000, 30000);
  },
};

const queueCache = new Map<string, Queue>();

function getQueue(name: string): Queue {
  let queue = queueCache.get(name);
  if (!queue) {
    queue = new Queue(name, { connection });
    // 'error' on a Queue also causes an unhandled EventEmitter crash without a listener.
    queue.on('error', (err) => logger.error(`Queue [${name}] error`, err));
    queueCache.set(name, queue);
  }
  return queue;
}

export function getRoadmapQueue(): Queue {
  return getQueue('roadmap-generation');
}

export function getNotificationQueue(): Queue {
  return getQueue('notifications');
}

export function getAnalyticsQueue(): Queue {
  return getQueue('analytics-aggregation');
}

export function getReportQueue(): Queue {
  return getQueue('weekly-reports');
}

export async function closeAllQueues(): Promise<void> {
  await Promise.all([...queueCache.values()].map((q) => q.close()));
  queueCache.clear();
}
