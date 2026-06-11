import { AnalyticsEventType, Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { cacheGet, cacheSet } from '../../config/redis';

export class AnalyticsService {
  async trackEvent(userId: string | null, eventType: AnalyticsEventType, metadata?: Record<string, unknown>) {
    return prisma.analyticsEvent.create({
      data: {
        userId: userId ?? undefined,
        eventType,
        metadata: metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async getDashboard() {
    const cacheKey = 'analytics:dashboard';
    const cached = await cacheGet<Record<string, unknown>>(cacheKey);
    if (cached) return cached;

    const [
      totalUsers,
      totalRoadmaps,
      activeRoadmaps,
      completedMilestones,
      totalMilestones,
      approvedReviews,
      totalReviews,
      registeredEvents,
      goalEvents,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.roadmap.count(),
      prisma.roadmap.count({ where: { status: 'ACTIVE' } }),
      prisma.milestone.count({ where: { status: 'COMPLETED' } }),
      prisma.milestone.count(),
      prisma.mentorReview.count({ where: { status: 'APPROVED' } }),
      prisma.mentorReview.count(),
      prisma.analyticsEvent.count({ where: { eventType: 'ACCOUNT_REGISTERED' } }),
      prisma.analyticsEvent.count({ where: { eventType: 'GOAL_SELECTED' } }),
    ]);

    const roadmapActivationRate = totalUsers > 0 ? Math.round((totalRoadmaps / totalUsers) * 100) : 0;
    const milestoneCompletionRate = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
    const mentorApprovalRate = totalReviews > 0 ? Math.round((approvedReviews / totalReviews) * 100) : 0;
    const goalRetentionRate = registeredEvents > 0 ? Math.round((goalEvents / registeredEvents) * 100) : 0;

    const dashboard = {
      totalUsers,
      totalRoadmaps,
      activeRoadmaps,
      roadmapActivationRate,
      milestoneCompletionRate,
      mentorApprovalRate,
      goalRetentionRate,
      skillGrowthRate: 24,
    };

    await cacheSet(cacheKey, dashboard, 120);
    return dashboard;
  }

  async getReports(userId?: string) {
    const where = userId ? { userId } : {};
    const events = await prisma.analyticsEvent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const progress = userId
      ? await prisma.progressUpdate.findMany({
          where: { userId },
          include: { milestone: true },
          orderBy: { createdAt: 'desc' },
        })
      : [];

    return { events, progress };
  }
}

export const analyticsService = new AnalyticsService();
