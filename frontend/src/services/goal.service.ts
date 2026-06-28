import api from './api';
import type { ApiResponse, CareerGoalRecord, CareerTrack } from '../types/api';

export const goalService = {
  async create(
    careerGoal: CareerTrack,
    targetTimeline?: string
  ): Promise<CareerGoalRecord> {
    const res = await api.post<ApiResponse<CareerGoalRecord>>('/career-goals', {
      careerGoal,
      targetTimeline,
      isActive: true,
    });
    return res.data.data;
  },

  async list(): Promise<CareerGoalRecord[]> {
    const res = await api.get<ApiResponse<CareerGoalRecord[]>>('/career-goals');
    return res.data.data;
  },

  async update(
    id: string,
    data: { careerGoal?: CareerTrack; targetTimeline?: string; isActive?: boolean }
  ): Promise<CareerGoalRecord> {
    const res = await api.patch<ApiResponse<CareerGoalRecord>>(`/career-goals/${id}`, data);
    return res.data.data;
  },

  // Map frontend catalog id to backend CareerTrack enum
  mapIdToTrack(id: string): CareerTrack {
    const map: Record<string, CareerTrack> = {
      'swe': 'SOFTWARE_ENGINEER',
      'ai-eng': 'AI_ENGINEER',
      'data-sci': 'DATA_SCIENTIST',
      'full-stack': 'FULL_STACK_DEVELOPER',
      'devops': 'DEVOPS_ENGINEER',
      'cloud-eng': 'CLOUD_ENGINEER',
      'cybersecurity': 'CYBERSECURITY_ANALYST',
    };
    return map[id] ?? 'SOFTWARE_ENGINEER';
  },

  // Map backend CareerTrack to display name
  trackToDisplayName(track: CareerTrack): string {
    const map: Record<CareerTrack, string> = {
      SOFTWARE_ENGINEER: 'Software Engineer',
      DATA_SCIENTIST: 'Data Scientist',
      AI_ENGINEER: 'AI Engineer',
      CYBERSECURITY_ANALYST: 'Cybersecurity Analyst',
      CLOUD_ENGINEER: 'Cloud Engineer',
      DEVOPS_ENGINEER: 'DevOps Engineer',
      FULL_STACK_DEVELOPER: 'Full Stack Developer',
    };
    return map[track];
  },
};
