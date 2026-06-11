import { prisma } from '../../database/prisma';
import { NotFoundError } from '../../common/errors/AppError';
import { runGapAnalysis } from './gap-analysis.engine';
import { CareerTrack } from '@prisma/client';
import { cacheGet, cacheSet } from '../../config/redis';

export class GapAnalysisService {
  async analyze(userId: string, careerGoal: CareerTrack) {
    const cacheKey = `gap:${userId}:${careerGoal}`;
    const cached = await cacheGet<Awaited<ReturnType<typeof prisma.gapAnalysis.create>>>(cacheKey);
    if (cached) return cached;

    const careerPath = await prisma.careerPath.findUnique({
      where: { track: careerGoal },
      include: {
        careerPathSkills: { include: { skill: true } },
      },
    });

    if (!careerPath) {
      throw new NotFoundError('Career path configuration');
    }

    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });

    const requiredSkills = careerPath.careerPathSkills.map((cps) => ({
      name: cps.skill.name,
      minLevel: cps.minLevel,
    }));

    const currentSkills = userSkills.map((us) => ({
      name: us.skill.name,
      level: us.level,
      score: us.score,
    }));

    const result = runGapAnalysis(careerGoal, currentSkills, requiredSkills);

    const saved = await prisma.gapAnalysis.create({
      data: {
        userId,
        careerGoal,
        readinessScore: result.readinessScore,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        missingSkills: result.missingSkills,
        recommendations: result.recommendations,
      },
    });

    await cacheSet(cacheKey, saved, 300);
    return saved;
  }
}

export const gapAnalysisService = new GapAnalysisService();
