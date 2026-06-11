import { Queue } from 'bullmq';
import { env } from '../config/env';

const connection = { url: env.REDIS_URL };

const queueCache = new Map<string, Queue>();

function getQueue(name: string): Queue {
  let queue = queueCache.get(name);
  if (!queue) {
    queue = new Queue(name, { connection });
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
