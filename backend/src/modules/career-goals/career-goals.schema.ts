import { z } from 'zod';
import { CareerTrack } from '@prisma/client';

export const createCareerGoalSchema = z.object({
  careerGoal: z.nativeEnum(CareerTrack),
  targetTimeline: z.string().min(1).optional(),
  careerPathId: z.string().uuid().optional(),
});

export const updateCareerGoalSchema = z.object({
  careerGoal: z.nativeEnum(CareerTrack).optional(),
  targetTimeline: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const careerGoalIdSchema = z.object({
  id: z.string().uuid(),
});
