import { z } from 'zod';
import { NotificationType } from '@prisma/client';

export const createNotificationSchema = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  type: z.nativeEnum(NotificationType).default('SYSTEM'),
});

export const notificationIdSchema = z.object({
  id: z.string().uuid(),
});
