import { Role } from '@prisma/client';

export const PERMISSIONS = {
  PROFILE_MANAGE: 'profile:manage',
  GOAL_SELECT: 'goal:select',
  ROADMAP_VIEW: 'roadmap:view',
  ROADMAP_GENERATE: 'roadmap:generate',
  PROGRESS_TRACK: 'progress:track',
  EVIDENCE_UPLOAD: 'evidence:upload',
  MENTOR_REVIEW: 'mentor:review',
  MENTOR_APPROVE: 'mentor:approve',
  REPORTS_VIEW: 'reports:view',
  ANALYTICS_VIEW: 'analytics:view',
  ADMIN_USERS: 'admin:users',
  ADMIN_SKILLS: 'admin:skills',
  ADMIN_PATHS: 'admin:paths',
  ADMIN_FULL: 'admin:full',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  STUDENT: [
    PERMISSIONS.PROFILE_MANAGE,
    PERMISSIONS.GOAL_SELECT,
    PERMISSIONS.ROADMAP_VIEW,
    PERMISSIONS.ROADMAP_GENERATE,
    PERMISSIONS.PROGRESS_TRACK,
    PERMISSIONS.EVIDENCE_UPLOAD,
  ],
  MENTOR: [
    PERMISSIONS.MENTOR_REVIEW,
    PERMISSIONS.MENTOR_APPROVE,
    PERMISSIONS.ROADMAP_VIEW,
    PERMISSIONS.PROGRESS_TRACK,
  ],
  PLACEMENT_OFFICER: [
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.ROADMAP_VIEW,
    PERMISSIONS.PROGRESS_TRACK,
  ],
  ADMIN: Object.values(PERMISSIONS),
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}
