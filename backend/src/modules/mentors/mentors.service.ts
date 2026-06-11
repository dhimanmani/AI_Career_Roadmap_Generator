import { prisma } from '../../database/prisma';
import { ForbiddenError, NotFoundError } from '../../common/errors/AppError';
import { getNotificationQueue } from '../../jobs/queues';
import { z } from 'zod';
import { createMentorReviewSchema, updateMentorReviewSchema } from './mentors.schema';

type CreateInput = z.infer<typeof createMentorReviewSchema>;
type UpdateInput = z.infer<typeof updateMentorReviewSchema>;

export class MentorsService {
  async create(mentorId: string, input: CreateInput) {
    const roadmap = await prisma.roadmap.findUnique({ where: { id: input.roadmapId } });
    if (!roadmap) throw new NotFoundError('Roadmap');
    if (roadmap.userId !== input.studentId) throw new ForbiddenError('Roadmap does not belong to student');

    const review = await prisma.mentorReview.create({
      data: {
        mentorId,
        studentId: input.studentId,
        roadmapId: input.roadmapId,
        comments: input.comments,
        rating: input.rating,
        suggestions: input.suggestions ?? [],
        status: 'PENDING',
      },
      include: {
        mentor: { select: { id: true, name: true } },
        student: { select: { id: true, name: true } },
      },
    });

    await getNotificationQueue().add('mentor-review', {
      userId: input.studentId,
      title: 'New Mentor Review',
      message: 'A mentor has submitted feedback on your roadmap.',
      type: 'MENTOR',
    });

    return review;
  }

  async list(userId: string, role: string) {
    const where =
      role === 'MENTOR'
        ? { mentorId: userId }
        : role === 'STUDENT'
          ? { studentId: userId }
          : {};

    return prisma.mentorReview.findMany({
      where,
      include: {
        mentor: { select: { id: true, name: true } },
        student: { select: { id: true, name: true } },
        roadmap: { select: { id: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, userId: string, role: string, input: UpdateInput) {
    const review = await prisma.mentorReview.findUnique({ where: { id } });
    if (!review) throw new NotFoundError('Mentor review');
    if (review.mentorId !== userId && role !== 'ADMIN') throw new ForbiddenError();

    const updated = await prisma.mentorReview.update({
      where: { id },
      data: input,
    });

    if (input.status === 'APPROVED' || input.status === 'REJECTED') {
      await getNotificationQueue().add('review-status', {
        userId: review.studentId,
        title: `Roadmap Review ${input.status}`,
        message: `Your mentor has ${input.status.toLowerCase()} your roadmap review.`,
        type: 'MENTOR',
      });
    }

    return updated;
  }
}

export const mentorsService = new MentorsService();
