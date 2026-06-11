import { z } from 'zod';
import { CareerTrack } from '@prisma/client';

export const gapAnalysisSchema = z.object({
  careerGoal: z.nativeEnum(CareerTrack),
});
