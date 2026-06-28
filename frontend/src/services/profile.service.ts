import api from './api';
import type { ApiResponse, CareerProfile } from '../types/api';

export interface CreateProfileInput {
  education?: string;
  university?: string;
  degree?: string;
  cgpa?: number;
  graduationYear?: number;
  certifications?: string[];
  interests?: string[];
  learningStyle?: string;
}

export type UpdateProfileInput = Partial<CreateProfileInput>;

export const profileService = {
  async create(data: CreateProfileInput): Promise<CareerProfile> {
    const res = await api.post<ApiResponse<CareerProfile>>('/profiles', data);
    return res.data.data;
  },

  async getById(id: string): Promise<CareerProfile> {
    const res = await api.get<ApiResponse<CareerProfile>>(`/profiles/${id}`);
    return res.data.data;
  },

  async update(id: string, data: UpdateProfileInput): Promise<CareerProfile> {
    const res = await api.patch<ApiResponse<CareerProfile>>(`/profiles/${id}`, data);
    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/profiles/${id}`);
  },
};
