import { z } from 'zod';
import { MilestoneDifficulty, MilestoneStatus } from '@prisma/client';

export const generateRoadmapSchema = z.object({
  careerGoalId: z.string().uuid().optional(),
  useAi: z.boolean().default(true),
});

export const roadmapIdSchema = z.object({
  id: z.string().uuid(),
});

export const updateMilestoneSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  status: z.nativeEnum(MilestoneStatus).optional(),
  difficulty: z.nativeEnum(MilestoneDifficulty).optional(),
  estimatedHours: z.number().int().min(0).optional(),
});

export const milestoneIdSchema = z.object({
  id: z.string().uuid(),
});
