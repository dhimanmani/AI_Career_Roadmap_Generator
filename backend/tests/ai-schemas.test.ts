import { aiRoadmapSchema, aiProjectSchema } from '../src/ai/ai.schemas';

describe('AI Response Validation', () => {
  it('validates a correct roadmap response', () => {
    const data = {
      summary: 'A structured path to full stack development',
      milestones: [
        {
          title: 'JavaScript Foundations',
          description: 'Master ES6+ and async programming',
          phase: 1,
          difficulty: 'BEGINNER',
          estimatedHours: 40,
        },
        {
          title: 'React Development',
          description: 'Build interactive UIs with React',
          phase: 2,
          difficulty: 'INTERMEDIATE',
          estimatedHours: 60,
        },
        {
          title: 'Backend APIs',
          description: 'Create REST APIs with Node.js',
          phase: 2,
          difficulty: 'INTERMEDIATE',
          estimatedHours: 50,
        },
      ],
    };

    const parsed = aiRoadmapSchema.parse(data);
    expect(parsed.milestones).toHaveLength(3);
  });

  it('rejects invalid roadmap responses', () => {
    expect(() =>
      aiRoadmapSchema.parse({ milestones: [{ title: 'x' }] })
    ).toThrow();
  });

  it('validates project recommendations', () => {
    const data = {
      projects: [
        {
          title: 'Task Board',
          description: 'Kanban app',
          difficulty: 'INTERMEDIATE',
          skillsCovered: ['React'],
          estimatedDuration: '2 weeks',
        },
      ],
    };

    expect(aiProjectSchema.parse(data).projects).toHaveLength(1);
  });
});
