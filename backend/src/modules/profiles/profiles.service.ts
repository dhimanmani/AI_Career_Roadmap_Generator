import { prisma } from '../../database/prisma';
import { ConflictError, ForbiddenError, NotFoundError } from '../../common/errors/AppError';
import { analyticsService } from '../analytics/analytics.service';
import { z } from 'zod';
import { createProfileSchema } from './profiles.schema';

type CreateProfileInput = z.infer<typeof createProfileSchema>;

export class ProfilesService {
  async create(userId: string, input: CreateProfileInput) {
    const existing = await prisma.careerProfile.findUnique({ where: { userId } });
    if (existing) throw new ConflictError('Profile already exists for this user');

    const profile = await prisma.careerProfile.create({
      data: { userId, ...input, experience: input.experience ?? undefined },
    });

    await analyticsService.trackEvent(userId, 'PROFILE_COMPLETED');
    return profile;
  }

  async getById(id: string, requesterId: string, requesterRole: string) {
    const profile = await prisma.careerProfile.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    if (!profile) throw new NotFoundError('Profile');
    if (profile.userId !== requesterId && !['ADMIN', 'MENTOR', 'PLACEMENT_OFFICER'].includes(requesterRole)) {
      throw new ForbiddenError();
    }

    return profile;
  }

  async update(id: string, userId: string, input: Partial<CreateProfileInput>) {
    const profile = await prisma.careerProfile.findUnique({ where: { id } });
    if (!profile) throw new NotFoundError('Profile');
    if (profile.userId !== userId) throw new ForbiddenError();

    return prisma.careerProfile.update({
      where: { id },
      data: { ...input, experience: input.experience ?? undefined },
    });
  }

  async delete(id: string, userId: string) {
    const profile = await prisma.careerProfile.findUnique({ where: { id } });
    if (!profile) throw new NotFoundError('Profile');
    if (profile.userId !== userId) throw new ForbiddenError();

    await prisma.careerProfile.delete({ where: { id } });
    return { message: 'Profile deleted' };
  }
}

export const profilesService = new ProfilesService();
