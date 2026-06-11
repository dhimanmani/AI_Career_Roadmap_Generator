export const PROMPTS = {
  generateRoadmap: (careerGoal: string, skills: string[], timeline?: string) => `
You are an expert career coach. Generate a structured learning roadmap for a student targeting: ${careerGoal}.
Current skills: ${skills.join(', ') || 'None assessed'}.
Target timeline: ${timeline ?? '6-12 months'}.

Return ONLY valid JSON matching this schema:
{
  "summary": "brief overview",
  "milestones": [
    {
      "title": "string",
      "description": "string",
      "phase": 1-5,
      "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED",
      "estimatedHours": number,
      "resources": [{ "title": "string", "url": "string", "type": "Video|Article|Course" }]
    }
  ]
}
Include 6-10 milestones across 5 phases. Be specific and industry-relevant.`,

  recommendProjects: (careerGoal: string, gaps: string[]) => `
Recommend 3-5 portfolio projects for a ${careerGoal} candidate.
Skill gaps to address: ${gaps.join(', ') || 'general fundamentals'}.

Return ONLY valid JSON:
{
  "projects": [
    {
      "title": "string",
      "description": "string",
      "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED",
      "skillsCovered": ["string"],
      "estimatedDuration": "string"
    }
  ]
}`,

  weeklyStudyPlan: (milestone: string, hoursPerWeek: number) => `
Create a weekly study plan for milestone: "${milestone}" with ${hoursPerWeek} hours/week.

Return ONLY valid JSON:
{
  "week": 1,
  "focus": "string",
  "tasks": [{ "day": "Mon", "topic": "string", "hours": number, "activity": "string" }]
}`,

  suggestResources: (skill: string) => `
Suggest 3-5 learning resources for skill: ${skill}.

Return ONLY valid JSON:
{
  "resources": [{ "skill": "string", "title": "string", "url": "string", "type": "Course|Article|Video" }]
}`,

  reviseRoadmap: (currentMilestones: string, feedback: string) => `
Revise this career roadmap based on mentor feedback.

Current milestones: ${currentMilestones}
Feedback: ${feedback}

Return ONLY valid JSON with same roadmap schema (summary + milestones array).`,
};
