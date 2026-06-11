import {
  PrismaClient,
  Role,
  CareerTrack,
  SkillCategory,
  SkillLevel,
  MilestoneDifficulty,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const CAREER_PATHS: Array<{
  track: CareerTrack;
  title: string;
  description: string;
  salaryRange: string;
  growthRate: string;
  demandLevel: string;
  skills: Array<{ name: string; category: SkillCategory; minLevel: SkillLevel }>;
}> = [
  {
    track: 'FULL_STACK_DEVELOPER',
    title: 'Full Stack Developer',
    description: 'Build end-to-end web applications with modern frontend and backend stacks.',
    salaryRange: '$110,000 - $155,000',
    growthRate: '+24%',
    demandLevel: 'Very High',
    skills: [
      { name: 'JavaScript/TypeScript', category: 'PROGRAMMING', minLevel: 'INTERMEDIATE' },
      { name: 'React', category: 'FRAMEWORKS', minLevel: 'INTERMEDIATE' },
      { name: 'Node.js', category: 'FRAMEWORKS', minLevel: 'INTERMEDIATE' },
      { name: 'PostgreSQL', category: 'DATABASES', minLevel: 'INTERMEDIATE' },
      { name: 'Docker', category: 'DEVOPS', minLevel: 'BEGINNER' },
    ],
  },
  {
    track: 'SOFTWARE_ENGINEER',
    title: 'Software Engineer',
    description: 'Design and build reliable software systems across platforms.',
    salaryRange: '$115,000 - $160,000',
    growthRate: '+22%',
    demandLevel: 'Very High',
    skills: [
      { name: 'JavaScript/TypeScript', category: 'PROGRAMMING', minLevel: 'INTERMEDIATE' },
      { name: 'Data Structures & Algorithms', category: 'PROGRAMMING', minLevel: 'INTERMEDIATE' },
      { name: 'System Design', category: 'PROGRAMMING', minLevel: 'ADVANCED' },
      { name: 'Git', category: 'DEVOPS', minLevel: 'INTERMEDIATE' },
    ],
  },
  {
    track: 'AI_ENGINEER',
    title: 'AI Engineer',
    description: 'Build and deploy ML models and LLM-powered applications.',
    salaryRange: '$135,000 - $185,000',
    growthRate: '+35%',
    demandLevel: 'Very High',
    skills: [
      { name: 'Python', category: 'PROGRAMMING', minLevel: 'INTERMEDIATE' },
      { name: 'Machine Learning', category: 'AI_ML', minLevel: 'INTERMEDIATE' },
      { name: 'Deep Learning', category: 'AI_ML', minLevel: 'INTERMEDIATE' },
      { name: 'Docker', category: 'DEVOPS', minLevel: 'BEGINNER' },
    ],
  },
  {
    track: 'DATA_SCIENTIST',
    title: 'Data Scientist',
    description: 'Analyze data and build predictive models for business insights.',
    salaryRange: '$120,000 - $165,000',
    growthRate: '+28%',
    demandLevel: 'High',
    skills: [
      { name: 'Python', category: 'PROGRAMMING', minLevel: 'INTERMEDIATE' },
      { name: 'SQL', category: 'DATABASES', minLevel: 'INTERMEDIATE' },
      { name: 'Statistics', category: 'AI_ML', minLevel: 'INTERMEDIATE' },
      { name: 'Machine Learning', category: 'AI_ML', minLevel: 'INTERMEDIATE' },
    ],
  },
  {
    track: 'DEVOPS_ENGINEER',
    title: 'DevOps Engineer',
    description: 'Automate infrastructure, CI/CD, and cloud operations.',
    salaryRange: '$125,000 - $170,000',
    growthRate: '+21%',
    demandLevel: 'High',
    skills: [
      { name: 'Docker', category: 'DEVOPS', minLevel: 'INTERMEDIATE' },
      { name: 'Kubernetes', category: 'DEVOPS', minLevel: 'INTERMEDIATE' },
      { name: 'AWS', category: 'CLOUD', minLevel: 'INTERMEDIATE' },
      { name: 'Linux', category: 'PROGRAMMING', minLevel: 'INTERMEDIATE' },
    ],
  },
  {
    track: 'CLOUD_ENGINEER',
    title: 'Cloud Engineer',
    description: 'Architect and manage cloud-native applications and infrastructure.',
    salaryRange: '$120,000 - $165,000',
    growthRate: '+25%',
    demandLevel: 'High',
    skills: [
      { name: 'AWS', category: 'CLOUD', minLevel: 'INTERMEDIATE' },
      { name: 'Terraform', category: 'DEVOPS', minLevel: 'INTERMEDIATE' },
      { name: 'Docker', category: 'DEVOPS', minLevel: 'INTERMEDIATE' },
      { name: 'Networking', category: 'SECURITY', minLevel: 'BEGINNER' },
    ],
  },
  {
    track: 'CYBERSECURITY_ANALYST',
    title: 'Cybersecurity Analyst',
    description: 'Protect systems and networks from cyber threats.',
    salaryRange: '$105,000 - $145,000',
    growthRate: '+31%',
    demandLevel: 'Very High',
    skills: [
      { name: 'Networking', category: 'SECURITY', minLevel: 'INTERMEDIATE' },
      { name: 'Linux', category: 'PROGRAMMING', minLevel: 'INTERMEDIATE' },
      { name: 'Python', category: 'PROGRAMMING', minLevel: 'BEGINNER' },
      { name: 'Cryptography', category: 'SECURITY', minLevel: 'INTERMEDIATE' },
    ],
  },
];

const PROJECTS = [
  {
    title: 'Collaborative Task Board',
    description: 'Build a Kanban board with real-time updates using React and Node.js.',
    difficulty: 'INTERMEDIATE' as MilestoneDifficulty,
    skillsCovered: ['React', 'Node.js', 'PostgreSQL'],
    estimatedDuration: '3 weeks',
    category: 'Web Development',
    popularity: 94,
  },
  {
    title: 'AI Article Summarizer',
    description: 'Summarize web articles using OpenAI API with a React frontend.',
    difficulty: 'INTERMEDIATE' as MilestoneDifficulty,
    skillsCovered: ['Python', 'React', 'OpenAI API'],
    estimatedDuration: '2 weeks',
    category: 'AI',
    popularity: 88,
  },
  {
    title: 'RAG Chatbot on Documents',
    description: 'Upload PDFs and query them using retrieval-augmented generation.',
    difficulty: 'ADVANCED' as MilestoneDifficulty,
    skillsCovered: ['Python', 'LangChain', 'Vector Database'],
    estimatedDuration: '4 weeks',
    category: 'AI',
    popularity: 97,
  },
];

async function main() {
  const password = await bcrypt.hash('Admin123!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@acrg.app' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@acrg.app',
      password,
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  const mentorPassword = await bcrypt.hash('Mentor123!', 12);
  await prisma.user.upsert({
    where: { email: 'mentor@acrg.app' },
    update: {},
    create: {
      name: 'Dr. Sarah Jenkins',
      email: 'mentor@acrg.app',
      password: mentorPassword,
      role: Role.MENTOR,
      isVerified: true,
    },
  });

  const studentPassword = await bcrypt.hash('Student123!', 12);
  const student = await prisma.user.upsert({
    where: { email: 'student@acrg.app' },
    update: {},
    create: {
      name: 'Alex Rivera',
      email: 'student@acrg.app',
      password: studentPassword,
      role: Role.STUDENT,
      isVerified: true,
    },
  });

  for (const path of CAREER_PATHS) {
    const careerPath = await prisma.careerPath.upsert({
      where: { track: path.track },
      update: { title: path.title, description: path.description },
      create: {
        track: path.track,
        title: path.title,
        description: path.description,
        salaryRange: path.salaryRange,
        growthRate: path.growthRate,
        demandLevel: path.demandLevel,
        requiredSkills: path.skills.map((s) => s.name),
      },
    });

    for (const skillDef of path.skills) {
      const skill = await prisma.skill.upsert({
        where: { name: skillDef.name },
        update: {},
        create: { name: skillDef.name, category: skillDef.category },
      });

      await prisma.careerPathSkill.upsert({
        where: { careerPathId_skillId: { careerPathId: careerPath.id, skillId: skill.id } },
        update: { minLevel: skillDef.minLevel },
        create: { careerPathId: careerPath.id, skillId: skill.id, minLevel: skillDef.minLevel },
      });
    }
  }

  for (const project of PROJECTS) {
    await prisma.project.upsert({
      where: { id: project.title.toLowerCase().replace(/\s+/g, '-') },
      update: project,
      create: { id: project.title.toLowerCase().replace(/\s+/g, '-'), ...project },
    });
  }

  // Seed student skills for demo
  const reactSkill = await prisma.skill.findUnique({ where: { name: 'React' } });
  const jsSkill = await prisma.skill.findUnique({ where: { name: 'JavaScript/TypeScript' } });

  if (reactSkill) {
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: student.id, skillId: reactSkill.id } },
      update: {},
      create: { userId: student.id, skillId: reactSkill.id, level: 'INTERMEDIATE', score: 80 },
    });
  }
  if (jsSkill) {
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: student.id, skillId: jsSkill.id } },
      update: {},
      create: { userId: student.id, skillId: jsSkill.id, level: 'INTERMEDIATE', score: 75 },
    });
  }

  console.log('Seed complete:', { admin: admin.email, student: student.email });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
