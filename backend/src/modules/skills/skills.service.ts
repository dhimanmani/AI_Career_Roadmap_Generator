import { SkillLevel } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { ConflictError } from '../../common/errors/AppError';
import { z } from 'zod';
import { createSkillSchema, createUserSkillSchema, skillQuerySchema } from './skills.schema';

const LEVEL_SCORES: Record<SkillLevel, number> = {
  BEGINNER: 35,
  INTERMEDIATE: 65,
  ADVANCED: 90,
};

type CreateSkillInput = z.infer<typeof createSkillSchema>;
type CreateUserSkillInput = z.infer<typeof createUserSkillSchema>;
type SkillQuery = z.infer<typeof skillQuerySchema>;

export class SkillsService {
  async createSkill(input: CreateSkillInput) {
    const existing = await prisma.skill.findUnique({ where: { name: input.name } });
    if (existing) throw new ConflictError('Skill already exists');

    return prisma.skill.create({ data: input });
  }

  async listSkills(query: SkillQuery) {
    return prisma.skill.findMany({
      where: {
        category: query.category,
        name: query.search ? { contains: query.search, mode: 'insensitive' } : undefined,
      },
      orderBy: { name: 'asc' },
    });
  }

  async upsertUserSkill(userId: string, input: CreateUserSkillInput) {
    const score = input.score ?? LEVEL_SCORES[input.level];

    return prisma.userSkill.upsert({
      where: { userId_skillId: { userId, skillId: input.skillId } },
      create: { userId, skillId: input.skillId, level: input.level, score },
      update: { level: input.level, score },
      include: { skill: true },
    });
  }

  async listUserSkills(userId: string) {
    return prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
      orderBy: { updatedAt: 'desc' },
    });
  }
}

export const skillsService = new SkillsService();
