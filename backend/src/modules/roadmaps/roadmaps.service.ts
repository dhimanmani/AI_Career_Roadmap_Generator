import { MilestoneDifficulty, Prisma, RoadmapStatus } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { NotFoundError, ForbiddenError } from '../../common/errors/AppError';
import { aiService } from '../../ai/ai.service';
import { analyticsService } from '../analytics/analytics.service';
import { getRoadmapQueue } from '../../jobs/queues';
import { z } from 'zod';
import { generateRoadmapSchema, updateMilestoneSchema } from './roadmaps.schema';

type GenerateInput = z.infer<typeof generateRoadmapSchema>;
type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;

const FALLBACK_MILESTONES = [
  { title: 'Core Foundations', description: 'Build fundamental knowledge', phase: 1, difficulty: 'BEGINNER' as const, estimatedHours: 40 },
  { title: 'Intermediate Skills', description: 'Apply concepts in projects', phase: 2, difficulty: 'INTERMEDIATE' as const, estimatedHours: 60 },
  { title: 'Capstone Project', description: 'Portfolio-ready project', phase: 3, difficulty: 'ADVANCED' as const, estimatedHours: 80 },
];

export class RoadmapsService {
  async generate(userId: string, input: GenerateInput) {
    const activeGoal = input.careerGoalId
      ? await prisma.careerGoal.findFirst({ where: { id: input.careerGoalId, userId } })
      : await prisma.careerGoal.findFirst({ where: { userId, isActive: true } });

    if (!activeGoal) throw new NotFoundError('Active career goal');

    const roadmap = await prisma.roadmap.create({
      data: {
        userId,
        careerGoalId: activeGoal.id,
        status: RoadmapStatus.GENERATING,
      },
    });

    if (input.useAi && process.env.OPENAI_API_KEY) {
      await getRoadmapQueue().add('generate-roadmap', {
        roadmapId: roadmap.id,
        userId,
        careerGoal: activeGoal.careerGoal,
        targetTimeline: activeGoal.targetTimeline,
      });
      return { ...roadmap, message: 'Roadmap generation queued' };
    }

    return this.createMilestonesFromTemplate(roadmap.id, userId, activeGoal.careerGoal.toString());
  }

  async createMilestonesFromTemplate(roadmapId: string, userId: string, careerGoal: string) {
    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });

    let milestones = FALLBACK_MILESTONES;
    let aiMetadata: Prisma.InputJsonValue = { source: 'template' };

    if (process.env.OPENAI_API_KEY) {
      try {
        const aiResult = await aiService.generateRoadmap(
          careerGoal,
          userSkills.map((s) => `${s.skill.name} (${s.level})`),
        );
        milestones = aiResult.milestones.map((m) => ({
          title: m.title,
          description: m.description,
          phase: m.phase,
          difficulty: m.difficulty,
          estimatedHours: m.estimatedHours,
          resources: m.resources,
        }));
        aiMetadata = {
          source: 'openai',
          summary: aiResult.summary,
          cost: aiService.getMetrics(),
        } as unknown as Prisma.InputJsonValue;
      } catch {
        aiMetadata = { source: 'template', fallback: true };
      }
    }

    await prisma.milestone.createMany({
      data: milestones.map((m, index) => ({
        roadmapId,
        title: m.title,
        description: m.description,
        phase: m.phase,
        difficulty: m.difficulty as MilestoneDifficulty,
        estimatedHours: m.estimatedHours,
        orderIndex: index,
        resources: 'resources' in m ? (m.resources as Prisma.InputJsonValue) : undefined,
      })),
    });

    const updated = await prisma.roadmap.update({
      where: { id: roadmapId },
      data: { status: RoadmapStatus.ACTIVE, aiMetadata },
      include: { milestones: { orderBy: { orderIndex: 'asc' } } },
    });

    await analyticsService.trackEvent(userId, 'ROADMAP_GENERATED', { roadmapId });
    return updated;
  }

  async getById(id: string, userId: string, role: string) {
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      include: {
        milestones: { orderBy: { orderIndex: 'asc' } },
        careerGoal: true,
        mentorReviews: true,
      },
    });

    if (!roadmap) throw new NotFoundError('Roadmap');
    if (roadmap.userId !== userId && !['ADMIN', 'MENTOR', 'PLACEMENT_OFFICER'].includes(role)) {
      throw new ForbiddenError();
    }

    return roadmap;
  }

  async updateMilestone(id: string, userId: string, input: UpdateMilestoneInput) {
    const milestone = await prisma.milestone.findUnique({
      where: { id },
      include: { roadmap: true },
    });

    if (!milestone) throw new NotFoundError('Milestone');
    if (milestone.roadmap.userId !== userId) throw new ForbiddenError();

    const updated = await prisma.milestone.update({ where: { id }, data: input });

    if (input.status === 'COMPLETED') {
      await analyticsService.trackEvent(userId, 'MILESTONE_COMPLETED', { milestoneId: id });
    }

    return updated;
  }
}

export const roadmapsService = new RoadmapsService();
