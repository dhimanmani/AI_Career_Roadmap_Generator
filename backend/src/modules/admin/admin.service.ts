import { prisma } from '../../database/prisma';
import { NotFoundError } from '../../common/errors/AppError';
import { z } from 'zod';
import { updateUserAdminSchema, createCareerPathSchema, createAdminSkillSchema } from './admin.schema';

type UpdateUserInput = z.infer<typeof updateUserAdminSchema>;
type CreatePathInput = z.infer<typeof createCareerPathSchema>;
type CreateSkillInput = z.infer<typeof createAdminSkillSchema>;

export class AdminService {
  async listUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isVerified: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);
    return { users, total, page, limit };
  }

  async updateUser(id: string, input: UpdateUserInput) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('User');

    return prisma.user.update({
      where: { id },
      data: input,
      select: { id: true, name: true, email: true, role: true, isVerified: true },
    });
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('User');

    await prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }

  async listSkills() {
    return prisma.skill.findMany({ orderBy: { name: 'asc' } });
  }

  async createSkill(input: CreateSkillInput) {
    return prisma.skill.create({ data: input });
  }

  async listCareerPaths() {
    return prisma.careerPath.findMany({
      include: { careerPathSkills: { include: { skill: true } }, templates: true },
    });
  }

  async createCareerPath(input: CreatePathInput) {
    return prisma.careerPath.create({ data: input });
  }

  async systemAnalytics() {
    const [users, roadmaps, skills, events] = await Promise.all([
      prisma.user.count(),
      prisma.roadmap.count(),
      prisma.skill.count(),
      prisma.analyticsEvent.count(),
    ]);

    return { users, roadmaps, skills, events };
  }
}

export const adminService = new AdminService();
