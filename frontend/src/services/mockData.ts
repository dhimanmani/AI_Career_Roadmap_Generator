// Mock Data for AI Career Roadmap Generator (ACRG)

export interface CareerGoal {
  id: string;
  title: string;
  salary: string;
  growth: string;
  demand: 'High' | 'Very High' | 'Moderate';
  description: string;
  requiredSkills: string[];
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Frameworks' | 'Databases' | 'Cloud' | 'AI/ML' | 'Soft Skills';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  score: number; // 0 to 100
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Web Development' | 'AI' | 'Data Science' | 'Cloud' | 'Cybersecurity';
  skillsCovered: string[];
  duration: string;
  popularity: number;
}

export interface RoadmapMilestone {
  id: string;
  phase: 1 | 2 | 3 | 4 | 5;
  skillName: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Not Started' | 'In Progress' | 'Completed';
  resources: { title: string; url: string; type: 'Video' | 'Article' | 'Course' }[];
}

export interface MentorReviewItem {
  id: string;
  mentorName: string;
  avatar: string;
  role: string;
  date: string;
  rating: number;
  status: 'Approved' | 'Requires Changes' | 'Pending Review';
  feedbackText: string;
  suggestions: string[];
}

export interface NotificationItemType {
  id: string;
  category: 'Roadmap Updates' | 'Mentor Feedback' | 'Skill Recommendations' | 'Deadlines';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  education: string;
  university: string;
  graduationYear: number;
  experience: { role: string; company: string; duration: string }[];
  certifications: string[];
  projects: string[];
  interests: string[];
  learningStyle: 'Visual' | 'Hands-on' | 'Theoretical' | 'Self-paced';
}

// ----------------------------------------------------
// SAMPLE DATA DEFINITIONS
// ----------------------------------------------------

export const currentStudentProfile: UserProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@university.edu",
  age: 21,
  education: "B.Tech in Computer Science & Engineering",
  university: "Metropolitan Institute of Technology",
  graduationYear: 2027,
  experience: [
    { role: "Frontend Web Developer Intern", company: "PixelCraft Solutions", duration: "3 months" }
  ],
  certifications: ["AWS Certified Cloud Practitioner", "Google Data Analytics Professional Certificate"],
  projects: ["E-Commerce Frontend React App", "Personal Portfolio Site"],
  interests: ["Web Development", "AI", "Cloud"],
  learningStyle: "Hands-on"
};

export const careerGoals: CareerGoal[] = [
  {
    id: "swe",
    title: "Software Engineer",
    salary: "$115,000 - $160,000",
    growth: "+22% (Next 10 years)",
    demand: "Very High",
    description: "Design, build, and maintain software systems. Generalist developers who build web, mobile, and system-level applications.",
    requiredSkills: ["Data Structures & Algorithms", "JavaScript/TypeScript", "React", "Node.js", "System Design", "SQL", "Git"]
  },
  {
    id: "ai-eng",
    title: "AI Engineer",
    salary: "$135,000 - $185,000",
    growth: "+35% (Next 10 years)",
    demand: "Very High",
    description: "Build, evaluate, and deploy Machine Learning models and Generative AI pipelines. Work with LLMs, PyTorch, and cloud inference engines.",
    requiredSkills: ["Python", "Machine Learning", "Deep Learning", "NLP / LLMs", "PyTorch/TensorFlow", "API Integration", "Docker"]
  },
  {
    id: "data-sci",
    title: "Data Scientist",
    salary: "$120,000 - $165,000",
    growth: "+28% (Next 10 years)",
    demand: "High",
    description: "Analyze complex datasets to extract actionable business insights. Build predictive models, perform statistical testing, and create dashboards.",
    requiredSkills: ["Python", "SQL", "Statistics", "Pandas & NumPy", "Scikit-Learn", "Tableau/PowerBI", "Machine Learning"]
  },
  {
    id: "full-stack",
    title: "Full Stack Developer",
    salary: "$110,000 - $155,000",
    growth: "+24% (Next 10 years)",
    demand: "Very High",
    description: "Work on both the frontend and backend of web applications. Own features from UI/UX up to database migrations and server setups.",
    requiredSkills: ["React/Next.js", "Node.js/Express", "TypeScript", "PostgreSQL/MongoDB", "REST APIs / GraphQL", "Git & CI/CD", "Tailwind CSS"]
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    salary: "$125,000 - $170,000",
    growth: "+21% (Next 10 years)",
    demand: "High",
    description: "Manage system infrastructure, deployment pipelines, CI/CD pipelines, container clustering, and monitoring setups for reliable delivery.",
    requiredSkills: ["Linux / Bash", "Docker & Kubernetes", "CI/CD (GitHub Actions/Jenkins)", "Terraform (IaC)", "AWS/GCP", "Python/Go", "Monitoring (Prometheus/Grafana)"]
  },
  {
    id: "cloud-eng",
    title: "Cloud Engineer",
    salary: "$120,000 - $165,000",
    growth: "+25% (Next 10 years)",
    demand: "High",
    description: "Architect and manage cloud systems. Focus on cloud-native application architectures, serverless integrations, security, and optimization.",
    requiredSkills: ["AWS, Azure or GCP", "Cloud Security", "Serverless Architecture", "Docker", "Networking Fundamentals", "Terraform", "Cost Optimization"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    salary: "$105,000 - $145,000",
    growth: "+31% (Next 10 years)",
    demand: "Very High",
    description: "Protect systems, networks, and data from cyber threats. Perform penetration testing, security compliance checks, and security operations center analysis.",
    requiredSkills: ["Networking (TCP/IP)", "Linux Security", "Ethical Hacking / Penetration Testing", "SIEM Tools", "OWASP Top 10", "Cryptography", "Python"]
  }
];

export const skillInventory: SkillItem[] = [
  // Programming
  { name: "JavaScript/TypeScript", category: "Programming", level: "Intermediate", score: 75 },
  { name: "Python", category: "Programming", level: "Beginner", score: 40 },
  { name: "C++ / Java", category: "Programming", level: "Intermediate", score: 60 },
  // Frameworks
  { name: "React", category: "Frameworks", level: "Intermediate", score: 80 },
  { name: "Node.js / Express", category: "Frameworks", level: "Beginner", score: 35 },
  { name: "Next.js", category: "Frameworks", level: "Beginner", score: 25 },
  // Databases
  { name: "SQL (PostgreSQL/MySQL)", category: "Databases", level: "Intermediate", score: 65 },
  { name: "NoSQL (MongoDB)", category: "Databases", level: "Beginner", score: 30 },
  // Cloud
  { name: "AWS Services", category: "Cloud", level: "Beginner", score: 45 },
  { name: "Docker", category: "Cloud", level: "Beginner", score: 20 },
  // AI/ML
  { name: "Machine Learning Basics", category: "AI/ML", level: "Beginner", score: 15 },
  { name: "Prompt Engineering", category: "AI/ML", level: "Intermediate", score: 70 },
  // Soft Skills
  { name: "Communication", category: "Soft Skills", level: "Advanced", score: 90 },
  { name: "Problem Solving", category: "Soft Skills", level: "Intermediate", score: 70 },
  { name: "Teamwork", category: "Soft Skills", level: "Advanced", score: 85 }
];

export const gapAnalysisData = {
  selectedGoal: "Full Stack Developer",
  strengths: [
    { name: "React Web Development", score: 80, comment: "Proficient in frontend components, state, and rendering cycles." },
    { name: "Communication & Collaboration", score: 90, comment: "High aptitude for presenting technical designs and working in agile teams." },
    { name: "JavaScript/TypeScript core", score: 75, comment: "Solid understanding of ES6+, TypeScript types, and asynchronous JS." }
  ],
  weaknesses: [
    { name: "Backend Development", score: 35, comment: "Limited experience building REST APIs, middleware, and database ORMs." },
    { name: "Docker & Containerization", score: 20, comment: "Struggles with containerizing React/Node.js apps for deployment." },
    { name: "System Design & Scalability", score: 15, comment: "Needs foundations in horizontal scaling, caching strategies, and load balancing." }
  ],
  prioritySkills: [
    { name: "Node.js & Express API Development", importance: "High", timeframe: "2-3 Weeks" },
    { name: "PostgreSQL & Database Relationships", importance: "High", timeframe: "2 Weeks" },
    { name: "Docker & Basic CI/CD", importance: "Medium", timeframe: "1-2 Weeks" }
  ],
  recommendations: [
    { skill: "Node.js Backend", resource: "Building REST APIs with Node.js & Express", type: "Course", url: "#" },
    { skill: "PostgreSQL", resource: "SQL & PostgreSQL Developer Masterclass", type: "Course", url: "#" },
    { skill: "System Design", resource: "Grokking the System Design Interview", type: "Article", url: "#" }
  ]
};

export const sampleRoadmap: RoadmapMilestone[] = [
  // Phase 1: Foundations
  {
    id: "m1",
    phase: 1,
    skillName: "Advanced JavaScript & ES6+",
    description: "Deep dive into JS Closures, Prototypes, Event Loop, Promises, Async/Await, and ES Modules.",
    duration: "1 Week",
    difficulty: "Intermediate",
    status: "Completed",
    resources: [
      { title: "You Don't Know JS Yet", url: "#", type: "Article" },
      { title: "JavaScript: The Advanced Concepts", url: "#", type: "Course" }
    ]
  },
  {
    id: "m2",
    phase: 1,
    skillName: "SQL Databases (PostgreSQL)",
    description: "Relational database concepts, normalization, JOIN operations, indexing, and transactional integrity.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    status: "Completed",
    resources: [
      { title: "PostgreSQL Tutorial for Beginners", url: "#", type: "Video" },
      { title: "Intro to Relational Databases", url: "#", type: "Course" }
    ]
  },
  // Phase 2: Intermediate Skills
  {
    id: "m3",
    phase: 2,
    skillName: "Node.js & Express REST APIs",
    description: "Learn server setup, routing, request/response cycle, middleware implementation, error handling, and database integration.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    status: "In Progress",
    resources: [
      { title: "Express.js Crash Course", url: "#", type: "Video" },
      { title: "Node.js, Express, MongoDB & More", url: "#", type: "Course" }
    ]
  },
  {
    id: "m4",
    phase: 2,
    skillName: "ORM & Query Builders (Prisma)",
    description: "Learn how to connect a database using Prisma ORM, run schema migrations, and write clean database queries in TypeScript.",
    duration: "1 Week",
    difficulty: "Intermediate",
    status: "Not Started",
    resources: [
      { title: "Prisma Quickstart Guide", url: "#", type: "Article" }
    ]
  },
  // Phase 3: Projects
  {
    id: "m5",
    phase: 3,
    skillName: "Full Stack App: Collaborative Task Planner",
    description: "Build a multi-user kanban board application using React, Node.js, Express, PostgreSQL, and Prisma with JWT authentication.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    status: "Not Started",
    resources: [
      { title: "Building a JWT Auth System", url: "#", type: "Article" },
      { title: "React Query Data Fetching & Sync", url: "#", type: "Video" }
    ]
  },
  // Phase 4: Advanced Concepts
  {
    id: "m6",
    phase: 4,
    skillName: "Dockerizing Full-Stack Apps",
    description: "Write Dockerfiles for React and Node.js, and link them together along with PostgreSQL database using Docker Compose.",
    duration: "2 Weeks",
    difficulty: "Advanced",
    status: "Not Started",
    resources: [
      { title: "Docker for Web Developers", url: "#", type: "Course" },
      { title: "Docker Compose Tutorial", url: "#", type: "Video" }
    ]
  },
  {
    id: "m7",
    phase: 4,
    skillName: "CI/CD & Serverless Deployment",
    description: "Configure GitHub Actions pipelines for automated linting, testing, and deployment to platforms like Render and Vercel.",
    duration: "2 Weeks",
    difficulty: "Advanced",
    status: "Not Started",
    resources: [
      { title: "GitHub Actions Tutorial", url: "#", type: "Video" }
    ]
  },
  // Phase 5: Interview Preparation
  {
    id: "m8",
    phase: 5,
    skillName: "DSA & System Design Preparation",
    description: "Practice arrays, hash maps, two pointers, trees, and graphs on LeetCode. Review caching, scaling, and load-balancing principles.",
    duration: "3 Weeks",
    difficulty: "Advanced",
    status: "Not Started",
    resources: [
      { title: "Blind 75 LeetCode Questions", url: "#", type: "Article" },
      { title: "System Design Primer", url: "#", type: "Article" }
    ]
  }
];

export const projectRecommendations: ProjectRecommendation[] = [
  {
    id: "p1",
    title: "Collaborative Project Task Board",
    description: "Build an interactive Kanban board where teams can create, assign, drag-and-drop tasks, write comments, and track progress in real-time.",
    difficulty: "Intermediate",
    category: "Web Development",
    skillsCovered: ["React", "TypeScript", "Node.js", "WebSockets", "SQL"],
    duration: "3 Weeks",
    popularity: 94
  },
  {
    id: "p2",
    title: "AI Summarizer & Article Analyzer",
    description: "An app that takes long web article links and provides a structured bullet-point summary, key topics, and sentiment analysis using OpenAI API.",
    difficulty: "Intermediate",
    category: "AI",
    skillsCovered: ["Python", "React", "OpenAI API", "FastAPI", "Prompt Engineering"],
    duration: "2 Weeks",
    popularity: 88
  },
  {
    id: "p3",
    title: "Custom LLM Chatbot on Personal Notes",
    description: "Build a Retrieval-Augmented Generation (RAG) system that lets users upload PDFs or Markdown files and ask questions about them.",
    difficulty: "Advanced",
    category: "AI",
    skillsCovered: ["Python", "LangChain", "Vector Database", "OpenAI / Anthropic", "Next.js"],
    duration: "4 Weeks",
    popularity: 97
  },
  {
    id: "p4",
    title: "DevOps Automated Infrastructure",
    description: "Write Terraform scripts to spin up a load-balanced web server setup on AWS (VPC, EC2, RDS) with automated backups and monitoring alerts.",
    difficulty: "Advanced",
    category: "Cloud",
    skillsCovered: ["AWS", "Terraform", "Linux Bash", "Prometheus", "Grafana"],
    duration: "3 Weeks",
    popularity: 79
  },
  {
    id: "p5",
    title: "SQL Performance Dashboard",
    description: "Create an application that parses custom database schemas and query execution plans, suggesting indexes and optimized query variations.",
    difficulty: "Intermediate",
    category: "Data Science",
    skillsCovered: ["SQL", "React", "Python", "Data Visualization"],
    duration: "2 Weeks",
    popularity: 72
  },
  {
    id: "p6",
    title: "E-Commerce Secure Payment Gateway Mock",
    description: "Implement a simulated payment processor that securely encrypts mock cards, generates transaction receipts, and tracks merchant accounts.",
    difficulty: "Intermediate",
    category: "Cybersecurity",
    skillsCovered: ["Cryptography", "Node.js", "OWASP Security", "React"],
    duration: "3 Weeks",
    popularity: 83
  },
  {
    id: "p7",
    title: "Serverless File Sharing App",
    description: "Build a fast file-sharing application utilizing AWS S3 Presigned URLs, AWS Lambda, DynamoDB, and an interactive React client.",
    difficulty: "Beginner",
    category: "Cloud",
    skillsCovered: ["React", "AWS S3", "AWS Lambda", "DynamoDB"],
    duration: "1 Week",
    popularity: 85
  }
];

export const mentorReviews: MentorReviewItem[] = [
  {
    id: "rev1",
    mentorName: "Dr. Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Senior Staff Engineer & Industry Advisor",
    date: "June 05, 2026",
    rating: 4.8,
    status: "Approved",
    feedbackText: "Alex has mapped out a highly logical learning pathway for Full Stack Development. The sequence from database engines directly into backends, and then containerization is perfect. I recommend adding a basic testing module (Jest/Supertest) right after the Node.js API milestone to ensure solid production habits.",
    suggestions: [
      "Add Unit and Integration Testing with Jest and Supertest in Phase 2.",
      "Consider learning Redis caching basics to stand out in backend interviews."
    ]
  },
  {
    id: "rev2",
    mentorName: "Prof. Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Associate Professor of CS & Placement Officer",
    date: "May 28, 2026",
    rating: 4.5,
    status: "Approved",
    feedbackText: "The roadmap aligns very well with what tier-1 tech recruiters are looking for. The timeline of completion should be accelerated slightly if you target the early campus drives starting August.",
    suggestions: [
      "Compress the SQL database segment to 1 week since you already have SQL basics.",
      "Complete the collaborative task board project by early July to include in preliminary resumes."
    ]
  }
];

export const notificationsList: NotificationItemType[] = [
  {
    id: "n1",
    category: "Mentor Feedback",
    title: "New Review Approved",
    message: "Dr. Sarah Jenkins approved your 'Full Stack Developer' roadmap and added 2 suggestions.",
    time: "2 hours ago",
    read: false
  },
  {
    id: "n2",
    category: "Skill Recommendations",
    title: "Recommended Skill: Prisma ORM",
    message: "Based on your Full Stack goals, the AI recommends adding Prisma ORM to your roadmap.",
    time: "1 day ago",
    read: false
  },
  {
    id: "n3",
    category: "Deadlines",
    title: "Target Completion Date Approaching",
    message: "Your Phase 2 milestones are scheduled to finish in 5 days. You are currently on track!",
    time: "2 days ago",
    read: true
  },
  {
    id: "n4",
    category: "Roadmap Updates",
    title: "Roadmap Regenerated Successfully",
    message: "Your curriculum has been updated to reflect your new graduation year of 2027.",
    time: "3 days ago",
    read: true
  }
];

export const progressStats = {
  roadmapCompletion: 38, // %
  skillsLearned: 6,
  projectsCompleted: 2,
  certificatesEarned: 2,
  weeklyLearningHours: [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 3.5 },
    { name: 'Wed', hours: 1 },
    { name: 'Thu', hours: 4 },
    { name: 'Fri', hours: 3 },
    { name: 'Sat', hours: 5.5 },
    { name: 'Sun', hours: 2.5 }
  ],
  monthlyActivity: [
    { name: 'Jan', rate: 10 },
    { name: 'Feb', rate: 25 },
    { name: 'Mar', rate: 30 },
    { name: 'Apr', rate: 45 },
    { name: 'May', rate: 55 },
    { name: 'Jun', rate: 68 }
  ],
  badges: [
    { id: "b1", title: "Quick Learner", desc: "Completed 3 milestones in a single week", icon: "zap", color: "text-amber-500 bg-amber-500/10" },
    { id: "b2", title: "SQL Wizard", desc: "Scored 80%+ on Relational Database test", icon: "database", color: "text-blue-500 bg-blue-500/10" },
    { id: "b3", title: "Builder of Things", desc: "Completed 2 full-fledged portfolio projects", icon: "package", color: "text-purple-500 bg-purple-500/10" },
    { id: "b4", title: "Mentor Approved", desc: "Had a roadmap reviewed and approved by a senior mentor", icon: "award", color: "text-green-500 bg-green-500/10" }
  ],
  streak: 12,
  cohortSize: 850
};

export const adminDashboardAnalytics = {
  stats: {
    totalUsers: 1420,
    activeTemplates: 7,
    pendingSubmissions: 24,
  },
  users: [
    { id: 'u101', name: 'Alice Smith', email: 'alice.s@univ.edu', role: 'Student', status: 'Active' },
    { id: 'u102', name: 'David Kim', email: 'd.kim@univ.edu', role: 'Mentor', status: 'Active' },
    { id: 'u103', name: 'Alex Rivera', email: 'alex.rivera@univ.edu', role: 'Student', status: 'Active' },
    { id: 'u104', name: 'Chloe Brown', email: 'chloe.b@univ.edu', role: 'Student', status: 'Reviewing' },
    { id: 'u105', name: 'Elijah Wright', email: 'elijah.w@univ.edu', role: 'Admin', status: 'Inactive' },
    { id: 'u106', name: 'Dr. Sarah Jenkins', email: 's.jenkins@univ.edu', role: 'Mentor', status: 'Active' },
    { id: 'u107', name: 'Prof. Marcus Vance', email: 'm.vance@univ.edu', role: 'Mentor', status: 'Active' },
  ],
};

export const adminAnalytics = {
  totalUsers: 1420,
  activeRoadmaps: 1180,
  mentorFeedbackRate: 88, // %
  avgSkillGrowth: 24, // %
  topCareerTracks: [
    { name: "Full Stack Developer", count: 420 },
    { name: "AI Engineer", count: 350 },
    { name: "Software Engineer", count: 310 },
    { name: "DevOps Engineer", count: 180 },
    { name: "Cybersecurity Analyst", count: 160 }
  ],
  userManagement: [
    { id: "u101", name: "Alice Smith", email: "alice.s@univ.edu", track: "AI Engineer", progress: 65, status: "Active", mentor: "Dr. Jenkins" },
    { id: "u102", name: "David Kim", email: "d.kim@univ.edu", track: "DevOps Engineer", progress: 20, status: "Active", mentor: "Prof. Vance" },
    { id: "u103", name: "Alex Rivera", email: "alex.rivera@univ.edu", track: "Full Stack Developer", progress: 38, status: "Active", mentor: "Dr. Jenkins" },
    { id: "u104", name: "Chloe Brown", email: "chloe.b@univ.edu", track: "Cybersecurity", progress: 85, status: "Reviewing", mentor: "Dr. Jenkins" },
    { id: "u105", name: "Elijah Wright", email: "elijah.w@univ.edu", track: "Software Engineer", progress: 0, status: "Inactive", mentor: "None" }
  ],
  mentorList: [
    { id: "m01", name: "Dr. Sarah Jenkins", specialty: "AI & Full Stack", activeReviews: 12, rating: 4.8 },
    { id: "m02", name: "Prof. Marcus Vance", specialty: "DevOps & Cloud", activeReviews: 8, rating: 4.5 },
    { id: "m03", name: "Elena Rostova", specialty: "Data Science & Stats", activeReviews: 14, rating: 4.9 }
  ]
};
