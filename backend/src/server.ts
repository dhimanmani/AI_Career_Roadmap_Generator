import { createApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { connectDatabase, disconnectDatabase } from './database/prisma';
import { connectRedis, disconnectRedis } from './config/redis';
import { startWorkers } from './jobs/workers';
import type { Worker } from 'bullmq';

let workers: Worker[] = [];

async function bootstrap() {
  await connectDatabase();
  await connectRedis();

  if (env.NODE_ENV !== 'test') {
    workers = startWorkers();
  }

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(`ACRG API running on port ${env.PORT}`);
    logger.info(`Swagger docs: http://localhost:${env.PORT}/api-docs`);
    logger.info(`API base: http://localhost:${env.PORT}${env.API_PREFIX}`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    server.close();
    await Promise.all(workers.map((w) => w.close()));
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
