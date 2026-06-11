import { z } from 'zod';
import { Role, CareerTrack, SkillCategory } from '@prisma/client';

export const updateUserAdminSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.nativeEnum(Role).optional(),
  isVerified: z.boolean().optional(),
});

export const createCareerPathSchema = z.object({
  track: z.nativeEnum(CareerTrack),
  title: z.string().min(2),
  description: z.string().min(10),
  salaryRange: z.string().optional(),
  growthRate: z.string().optional(),
  demandLevel: z.string().optional(),
  requiredSkills: z.array(z.string()).optional(),
});

export const createAdminSkillSchema = z.object({
  name: z.string().min(2),
  category: z.nativeEnum(SkillCategory),
});

export const userIdParamSchema = z.object({
  id: z.string().uuid(),
});
