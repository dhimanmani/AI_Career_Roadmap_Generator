import { runGapAnalysis } from '../src/modules/gap-analysis/gap-analysis.engine';
import { SkillLevel } from '@prisma/client';

describe('Gap Analysis Engine', () => {
  const requiredSkills = [
    { name: 'React', minLevel: 'INTERMEDIATE' as SkillLevel },
    { name: 'Node.js', minLevel: 'INTERMEDIATE' as SkillLevel },
    { name: 'Docker', minLevel: 'BEGINNER' as SkillLevel },
  ];

  it('calculates readiness score with mixed skills', () => {
    const result = runGapAnalysis(
      'FULL_STACK_DEVELOPER',
      [
        { name: 'React', level: 'ADVANCED', score: 85 },
        { name: 'Node.js', level: 'BEGINNER', score: 30 },
      ],
      requiredSkills
    );

    expect(result.readinessScore).toBeGreaterThan(0);
    expect(result.readinessScore).toBeLessThanOrEqual(100);
    expect(result.strengths.length).toBeGreaterThan(0);
    expect(result.weaknesses.length + result.missingSkills.length).toBeGreaterThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('returns high readiness when all skills meet requirements', () => {
    const result = runGapAnalysis(
      'FULL_STACK_DEVELOPER',
      [
        { name: 'React', level: 'ADVANCED', score: 90 },
        { name: 'Node.js', level: 'INTERMEDIATE', score: 70 },
        { name: 'Docker', level: 'BEGINNER', score: 40 },
      ],
      requiredSkills
    );

    expect(result.readinessScore).toBeGreaterThanOrEqual(80);
    expect(result.missingSkills).toHaveLength(0);
  });

  it('identifies completely missing skills', () => {
    const result = runGapAnalysis('FULL_STACK_DEVELOPER', [], requiredSkills);

    expect(result.missingSkills).toHaveLength(3);
    expect(result.readinessScore).toBe(0);
  });
});
