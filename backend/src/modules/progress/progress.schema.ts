import { z } from 'zod';

export const createProgressSchema = z.object({
  milestoneId: z.string().uuid(),
  completionPercentage: z.number().int().min(0).max(100),
  notes: z.string().max(2000).optional(),
  evidenceUrl: z.string().url().optional(),
});
