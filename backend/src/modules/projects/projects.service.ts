import { prisma } from '../../database/prisma';
import { aiService } from '../../ai/ai.service';
import { gapAnalysisService } from '../gap-analysis/gap-analysis.service';
import { CareerTrack } from '@prisma/client';

export class ProjectsService {
  async list() {
    return prisma.project.findMany({
      where: { isActive: true },
      orderBy: { popularity: 'desc' },
    });
  }

  async getRecommended(userId: string, careerGoal?: CareerTrack) {
    const activeGoal = careerGoal
      ?? (await prisma.careerGoal.findFirst({ where: { userId, isActive: true } }))?.careerGoal;

    if (!activeGoal) {
      return prisma.project.findMany({
        where: { isActive: true },
        take: 5,
        orderBy: { popularity: 'desc' },
      });
    }

    try {
      const gap = await gapAnalysisService.analyze(userId, activeGoal);
      const missingSkills = gap.missingSkills as Array<{ name: string }>;
      const missing = missingSkills.map((s) => s.name);

      if (process.env.OPENAI_API_KEY) {
        const aiProjects = await aiService.recommendProjects(activeGoal, missing);
        return aiProjects.projects;
      }

      return prisma.project.findMany({
        where: {
          isActive: true,
          OR: missing.map((skill) => ({
            skillsCovered: { has: skill },
          })),
        },
        take: 6,
      });
    } catch {
      return prisma.project.findMany({
        where: { isActive: true },
        take: 5,
        orderBy: { popularity: 'desc' },
      });
    }
  }
}

export const projectsService = new ProjectsService();
