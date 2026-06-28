import api from './api';
import type { ApiResponse, Roadmap, Milestone, MilestoneStatus, CareerTrack } from '../types/api';

export const roadmapService = {
  async generate(options?: { careerGoalId?: string; useAi?: boolean }): Promise<Roadmap> {
    const res = await api.post<ApiResponse<Roadmap>>('/roadmaps/generate', {
      useAi: options?.useAi ?? false,
      careerGoalId: options?.careerGoalId,
    });
    return res.data.data;
  },

  async getById(id: string): Promise<Roadmap> {
    const res = await api.get<ApiResponse<Roadmap>>(`/roadmaps/${id}`);
    return res.data.data;
  },

  async updateMilestoneStatus(
    milestoneId: string,
    status: MilestoneStatus
  ): Promise<Milestone> {
    const res = await api.patch<ApiResponse<Milestone>>(`/milestones/${milestoneId}`, {
      status,
    });
    return res.data.data;
  },

  // Map backend MilestoneStatus enum to frontend display strings
  statusToDisplay(status: MilestoneStatus): 'Not Started' | 'In Progress' | 'Completed' {
    const map: Record<MilestoneStatus, 'Not Started' | 'In Progress' | 'Completed'> = {
      NOT_STARTED: 'Not Started',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
    };
    return map[status];
  },

  // Map frontend display string to backend MilestoneStatus enum
  displayToStatus(display: 'Not Started' | 'In Progress' | 'Completed'): MilestoneStatus {
    const map: Record<string, MilestoneStatus> = {
      'Not Started': 'NOT_STARTED',
      'In Progress': 'IN_PROGRESS',
      'Completed': 'COMPLETED',
    };
    return map[display] ?? 'NOT_STARTED';
  },

  // Get completion percentage for a roadmap
  getCompletionPercent(milestones: Milestone[]): number {
    if (!milestones.length) return 0;
    const completed = milestones.filter((m) => m.status === 'COMPLETED').length;
    return Math.round((completed / milestones.length) * 100);
  },

  // Map CareerTrack to label
  trackLabel(track: CareerTrack | null | undefined): string {
    if (!track) return 'No Goal Set';
    const map: Record<CareerTrack, string> = {
      SOFTWARE_ENGINEER: 'Software Engineer',
      DATA_SCIENTIST: 'Data Scientist',
      AI_ENGINEER: 'AI Engineer',
      CYBERSECURITY_ANALYST: 'Cybersecurity Analyst',
      CLOUD_ENGINEER: 'Cloud Engineer',
      DEVOPS_ENGINEER: 'DevOps Engineer',
      FULL_STACK_DEVELOPER: 'Full Stack Developer',
    };
    return map[track] ?? track;
  },
};
