import { createApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { connectDatabase, disconnectDatabase } from './database/prisma';
import { connectRedis, disconnectRedis } from './config/redis';
import { startWorkers } from './jobs/workers';
import { closeAllQueues } from './jobs/queues';
import type { Worker } from 'bullmq';

let workers: Worker[] = [];

async function bootstrap() {
  await connectDatabase();

  // connectRedis() returns true only when Redis responds to a PING.
  // Workers require Redis — they are skipped when Redis is unavailable.
  const redisConnected = await connectRedis();

  if (env.NODE_ENV !== 'test') {
    if (redisConnected) {
      workers = startWorkers();
    } else {
      logger.warn('BullMQ workers not started — Redis is unavailable. Restart with Redis running to enable background job processing.');
    }
  }

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(`ACRG API running on port ${env.PORT}`);
    logger.info(`Swagger docs: http://localhost:${env.PORT}/api-docs`);
    logger.info(`API base: http://localhost:${env.PORT}${env.API_PREFIX}`);
    if (!redisConnected) {
      logger.warn('⚠  Redis is offline — async roadmap generation and notification queues are unavailable');
    }
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    server.close();
    await Promise.all(workers.map((w) => w.close()));
    await closeAllQueues();
    await disconnectRedis();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
