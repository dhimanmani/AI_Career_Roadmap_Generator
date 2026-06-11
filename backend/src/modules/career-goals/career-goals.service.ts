import { prisma } from '../../database/prisma';
import { NotFoundError, ForbiddenError } from '../../common/errors/AppError';
import { analyticsService } from '../analytics/analytics.service';
import { z } from 'zod';
import { createCareerGoalSchema, updateCareerGoalSchema } from './career-goals.schema';

type CreateInput = z.infer<typeof createCareerGoalSchema>;
type UpdateInput = z.infer<typeof updateCareerGoalSchema>;

export class CareerGoalsService {
  async create(userId: string, input: CreateInput) {
    await prisma.careerGoal.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    const goal = await prisma.careerGoal.create({
      data: { userId, ...input },
      include: { careerPath: true },
    });

    await analyticsService.trackEvent(userId, 'GOAL_SELECTED', { careerGoal: input.careerGoal });
    return goal;
  }

  async list(userId: string) {
    return prisma.careerGoal.findMany({
      where: { userId },
      include: { careerPath: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, userId: string, input: UpdateInput) {
    const goal = await prisma.careerGoal.findUnique({ where: { id } });
    if (!goal) throw new NotFoundError('Career goal');
    if (goal.userId !== userId) throw new ForbiddenError();

    return prisma.careerGoal.update({
      where: { id },
      data: input,
      include: { careerPath: true },
    });
  }
}

export const careerGoalsService = new CareerGoalsService();
