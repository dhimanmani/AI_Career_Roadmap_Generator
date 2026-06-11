import { CareerTrack, SkillLevel } from '@prisma/client';

const LEVEL_SCORE: Record<SkillLevel, number> = {
  BEGINNER: 35,
  INTERMEDIATE: 65,
  ADVANCED: 90,
};

const MIN_LEVEL_SCORE: Record<SkillLevel, number> = {
  BEGINNER: 30,
  INTERMEDIATE: 60,
  ADVANCED: 80,
};

export interface SkillInput {
  name: string;
  level: SkillLevel;
  score: number;
}

export interface RequiredSkill {
  name: string;
  minLevel: SkillLevel;
}

export interface GapAnalysisResult {
  readinessScore: number;
  strengths: Array<{ name: string; score: number; comment: string }>;
  weaknesses: Array<{ name: string; score: number; comment: string }>;
  missingSkills: Array<{ name: string; requiredLevel: SkillLevel; gap: number }>;
  recommendations: Array<{ skill: string; resource: string; type: string }>;
}

export function runGapAnalysis(
  careerGoal: CareerTrack,
  currentSkills: SkillInput[],
  requiredSkills: RequiredSkill[]
): GapAnalysisResult {
  const skillMap = new Map(currentSkills.map((s) => [s.name.toLowerCase(), s]));

  const strengths: GapAnalysisResult['strengths'] = [];
  const weaknesses: GapAnalysisResult['weaknesses'] = [];
  const missingSkills: GapAnalysisResult['missingSkills'] = [];
  const recommendations: GapAnalysisResult['recommendations'] = [];

  let totalRequired = 0;
  let totalAchieved = 0;

  for (const required of requiredSkills) {
    const key = required.name.toLowerCase();
    const current = skillMap.get(key);
    const minScore = MIN_LEVEL_SCORE[required.minLevel];
    totalRequired += minScore;

    if (!current) {
      missingSkills.push({
        name: required.name,
        requiredLevel: required.minLevel,
        gap: minScore,
      });
      recommendations.push({
        skill: required.name,
        resource: `Foundational course on ${required.name}`,
        type: 'Course',
      });
      continue;
    }

    const achieved = Math.min(current.score, 100);
    totalAchieved += Math.min(achieved, minScore);

    if (achieved >= minScore) {
      strengths.push({
        name: required.name,
        score: achieved,
        comment: `Meets ${required.minLevel.toLowerCase()} requirement for ${formatCareer(careerGoal)}.`,
      });
    } else {
      const gap = minScore - achieved;
      weaknesses.push({
        name: required.name,
        score: achieved,
        comment: `Below required ${required.minLevel.toLowerCase()} level by ${gap} points.`,
      });
      missingSkills.push({
        name: required.name,
        requiredLevel: required.minLevel,
        gap,
      });
      recommendations.push({
        skill: required.name,
        resource: `Targeted learning path for ${required.name}`,
        type: achieved < LEVEL_SCORE.BEGINNER ? 'Course' : 'Project',
      });
    }
  }

  const readinessScore = totalRequired > 0 ? Math.round((totalAchieved / totalRequired) * 100) : 0;

  return {
    readinessScore,
    strengths,
    weaknesses,
    missingSkills,
    recommendations,
  };
}

function formatCareer(track: CareerTrack): string {
  return track.replace(/_/g, ' ').toLowerCase();
}
