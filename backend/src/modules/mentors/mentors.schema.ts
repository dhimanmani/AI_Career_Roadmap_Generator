import { z } from 'zod';
import { ReviewStatus } from '@prisma/client';

export const createMentorReviewSchema = z.object({
  studentId: z.string().uuid(),
  roadmapId: z.string().uuid(),
  comments: z.string().min(10).max(5000),
  rating: z.number().int().min(1).max(5).optional(),
  suggestions: z.array(z.string()).optional(),
});

export const updateMentorReviewSchema = z.object({
  comments: z.string().min(10).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  status: z.nativeEnum(ReviewStatus).optional(),
  suggestions: z.array(z.string()).optional(),
});

export const mentorReviewIdSchema = z.object({
  id: z.string().uuid(),
});
