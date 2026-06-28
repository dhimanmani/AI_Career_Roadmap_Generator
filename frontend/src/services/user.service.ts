import api from './api';
import type { ApiResponse, AuthUser } from '../types/api';

export interface UpdateUserInput {
  name?: string;
  profileImage?: string;
}

export const userService = {
  async getMe(): Promise<AuthUser> {
    const res = await api.get<ApiResponse<AuthUser>>('/users/me');
    return res.data.data;
  },

  async updateMe(data: UpdateUserInput): Promise<AuthUser> {
    const res = await api.patch<ApiResponse<AuthUser>>('/users/me', data);
    return res.data.data;
  },
};
