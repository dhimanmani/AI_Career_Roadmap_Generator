import { prisma } from '../../database/prisma';
import { ForbiddenError, NotFoundError } from '../../common/errors/AppError';
import { z } from 'zod';
import { createProgressSchema } from './progress.schema';

type CreateProgressInput = z.infer<typeof createProgressSchema>;

export class ProgressService {
  async create(userId: string, input: CreateProgressInput) {
    const milestone = await prisma.milestone.findUnique({
      where: { id: input.milestoneId },
      include: { roadmap: true },
    });

    if (!milestone) throw new NotFoundError('Milestone');
    if (milestone.roadmap.userId !== userId) throw new ForbiddenError();

    const update = await prisma.progressUpdate.create({
      data: { userId, ...input },
      include: { milestone: true },
    });

    if (input.completionPercentage >= 100) {
      await prisma.milestone.update({
        where: { id: input.milestoneId },
        data: { status: 'COMPLETED' },
      });
    } else if (input.completionPercentage > 0) {
      await prisma.milestone.update({
        where: { id: input.milestoneId },
        data: { status: 'IN_PROGRESS' },
      });
    }

    return update;
  }

  async list(userId: string) {
    return prisma.progressUpdate.findMany({
      where: { userId },
      include: { milestone: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async summary(userId: string) {
    const [milestones, progressUpdates, userSkills, projects] = await Promise.all([
      prisma.milestone.count({
        where: { roadmap: { userId }, status: 'COMPLETED' },
      }),
      prisma.progressUpdate.findMany({ where: { userId } }),
      prisma.userSkill.count({ where: { userId, level: { not: 'BEGINNER' } } }),
      prisma.analyticsEvent.count({ where: { userId, eventType: 'PROJECT_COMPLETED' } }),
    ]);

    const totalMilestones = await prisma.milestone.count({
      where: { roadmap: { userId } },
    });

    const avgCompletion = progressUpdates.length
      ? Math.round(
          progressUpdates.reduce((sum, p) => sum + p.completionPercentage, 0) / progressUpdates.length
        )
      : 0;

    return {
      completionRate: totalMilestones > 0 ? Math.round((milestones / totalMilestones) * 100) : 0,
      skillsAcquired: userSkills,
      milestonesCompleted: milestones,
      projectsCompleted: projects,
      averageProgress: avgCompletion,
    };
  }
}

export const progressService = new ProgressService();
