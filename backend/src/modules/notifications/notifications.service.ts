import { NotificationType, Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { NotFoundError, ForbiddenError } from '../../common/errors/AppError';

export class NotificationsService {
  async create(
    userId: string,
    data: { title: string; message: string; type: NotificationType; metadata?: Record<string, unknown> }
  ) {
    return prisma.notification.create({
      data: {
        userId,
        title: data.title,
        message: data.message,
        type: data.type,
        metadata: data.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async list(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markRead(id: string, userId: string) {
    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundError('Notification');
    if (notification.userId !== userId) throw new ForbiddenError();

    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}

export const notificationsService = new NotificationsService();
