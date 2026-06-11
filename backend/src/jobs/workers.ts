import { Worker, Job } from 'bullmq';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { prisma } from '../database/prisma';
import { roadmapsService } from '../modules/roadmaps/roadmaps.service';
import { notificationsService } from '../modules/notifications/notifications.service';
import { analyticsService } from '../modules/analytics/analytics.service';
import { JobStatus } from '@prisma/client';

const connection = { url: env.REDIS_URL };

async function trackJob(queueName: string, job: Job, status: JobStatus, result?: unknown, error?: string) {
  const jobId = String(job.id);
  const existing = await prisma.backgroundJob.findFirst({
    where: { queueName, jobId },
  });

  const data = {
    status,
    result: result as object | undefined,
    error,
    completedAt: status === 'COMPLETED' || status === 'FAILED' ? new Date() : undefined,
  };

  if (existing) {
    await prisma.backgroundJob.update({ where: { id: existing.id }, data });
  } else {
    await prisma.backgroundJob.create({
      data: {
        queueName,
        jobId,
        status,
        payload: job.data as object,
        result: result as object | undefined,
        error,
        completedAt: data.completedAt,
      },
    });
  }
}

export function startWorkers(): Worker[] {
  const workers: Worker[] = [];

  workers.push(
    new Worker(
      'roadmap-generation',
      async (job) => {
        await trackJob('roadmap-generation', job, 'RUNNING');
        const { roadmapId, userId, careerGoal } = job.data as {
          roadmapId: string;
          userId: string;
          careerGoal: string;
        };

        const result = await roadmapsService.createMilestonesFromTemplate(roadmapId, userId, careerGoal);
        await trackJob('roadmap-generation', job, 'COMPLETED', result);
        return result;
      },
      { connection }
    )
  );

  workers.push(
    new Worker(
      'notifications',
      async (job) => {
        await trackJob('notifications', job, 'RUNNING');
        const { userId, title, message, type } = job.data as {
          userId: string;
          title: string;
          message: string;
          type: 'ROADMAP' | 'MENTOR' | 'REMINDER' | 'SYSTEM';
        };

        const result = await notificationsService.create(userId, { title, message, type });
        await trackJob('notifications', job, 'COMPLETED', result);
        return result;
      },
      { connection }
    )
  );

  workers.push(
    new Worker(
      'analytics-aggregation',
      async (job) => {
        await trackJob('analytics-aggregation', job, 'RUNNING');
        const result = await analyticsService.getDashboard();
        await trackJob('analytics-aggregation', job, 'COMPLETED', result);
        return result;
      },
      { connection }
    )
  );

  workers.push(
    new Worker(
      'weekly-reports',
      async (job) => {
        await trackJob('weekly-reports', job, 'RUNNING');
        const { userId } = job.data as { userId: string };
        const summary = await prisma.progressUpdate.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 20,
        });

        await notificationsService.create(userId, {
          title: 'Weekly Progress Report',
          message: `You logged ${summary.length} progress updates this period.`,
          type: 'REMINDER',
        });

        await trackJob('weekly-reports', job, 'COMPLETED', { count: summary.length });
        return summary;
      },
      { connection }
    )
  );

  workers.forEach((worker) => {
    worker.on('failed', (job, err) => {
      logger.error(`Job ${job?.id} failed`, err);
      if (job) trackJob(worker.name, job, 'FAILED', undefined, err.message);
    });
    worker.on('completed', (job) => logger.info(`Job ${job.id} completed on ${worker.name}`));
  });

  logger.info('Background workers started');
  return workers;
}
