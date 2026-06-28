// ============================================================
// Shared API Types for ACRG Frontend ↔ Backend
// ============================================================

// --- Standard API wrapper ---
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// --- Auth ---
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'MENTOR' | 'PLACEMENT_OFFICER' | 'ADMIN';
  profileImage: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

// --- Career Profile ---
export interface CareerProfile {
  id: string;
  userId: string;
  education: string | null;
  university: string | null;
  degree: string | null;
  cgpa: number | null;
  graduationYear: number | null;
  experience: Record<string, unknown> | null;
  certifications: string[];
  interests: string[];
  learningStyle: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Career Goals ---
export type CareerTrack =
  | 'SOFTWARE_ENGINEER'
  | 'DATA_SCIENTIST'
  | 'AI_ENGINEER'
  | 'CYBERSECURITY_ANALYST'
  | 'CLOUD_ENGINEER'
  | 'DEVOPS_ENGINEER'
  | 'FULL_STACK_DEVELOPER';

export interface CareerGoalRecord {
  id: string;
  userId: string;
  careerPathId: string | null;
  careerGoal: CareerTrack;
  targetTimeline: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Roadmap ---
export type RoadmapStatus = 'DRAFT' | 'GENERATING' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type MilestoneStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
export type MilestoneDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface MilestoneResource {
  title: string;
  url: string;
  type: 'Video' | 'Article' | 'Course';
}

export interface Milestone {
  id: string;
  roadmapId: string;
  title: string;
  description: string;
  phase: number;
  difficulty: MilestoneDifficulty;
  estimatedHours: number;
  status: MilestoneStatus;
  resources: MilestoneResource[] | null;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface Roadmap {
  id: string;
  userId: string;
  careerGoalId: string | null;
  status: RoadmapStatus;
  aiMetadata: Record<string, unknown> | null;
  milestones: Milestone[];
  careerGoal: CareerGoalRecord | null;
  createdAt: string;
  updatedAt: string;
}

// --- Notifications ---
export type NotificationType = 'ROADMAP' | 'MENTOR' | 'REMINDER' | 'SYSTEM';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}
