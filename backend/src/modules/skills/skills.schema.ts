import { z } from 'zod';
import { SkillCategory, SkillLevel } from '@prisma/client';

export const createSkillSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.nativeEnum(SkillCategory),
});

export const createUserSkillSchema = z.object({
  skillId: z.string().uuid(),
  level: z.nativeEnum(SkillLevel),
  score: z.number().int().min(0).max(100).optional(),
});

export const skillQuerySchema = z.object({
  category: z.nativeEnum(SkillCategory).optional(),
  search: z.string().optional(),
});
