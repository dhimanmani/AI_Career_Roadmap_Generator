import api from './api';
import type { ApiResponse, Notification } from '../types/api';

export const notificationService = {
  async list(): Promise<Notification[]> {
    const res = await api.get<ApiResponse<Notification[]>>('/notifications');
    return res.data.data;
  },

  async markAsRead(id: string): Promise<Notification> {
    const res = await api.patch<ApiResponse<Notification>>(`/notifications/${id}/read`);
    return res.data.data;
  },
};
