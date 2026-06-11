import { hasPermission, PERMISSIONS } from '../src/common/permissions';
import { Role } from '@prisma/client';

describe('RBAC Permissions', () => {
  it('grants student profile management', () => {
    expect(hasPermission(Role.STUDENT, PERMISSIONS.PROFILE_MANAGE)).toBe(true);
    expect(hasPermission(Role.STUDENT, PERMISSIONS.ADMIN_FULL)).toBe(false);
  });

  it('grants mentor review permissions', () => {
    expect(hasPermission(Role.MENTOR, PERMISSIONS.MENTOR_REVIEW)).toBe(true);
    expect(hasPermission(Role.MENTOR, PERMISSIONS.MENTOR_APPROVE)).toBe(true);
  });

  it('grants placement officer analytics access', () => {
    expect(hasPermission(Role.PLACEMENT_OFFICER, PERMISSIONS.ANALYTICS_VIEW)).toBe(true);
    expect(hasPermission(Role.PLACEMENT_OFFICER, PERMISSIONS.ADMIN_USERS)).toBe(false);
  });

  it('grants admin full access', () => {
    expect(hasPermission(Role.ADMIN, PERMISSIONS.ADMIN_FULL)).toBe(true);
    expect(hasPermission(Role.ADMIN, PERMISSIONS.ADMIN_SKILLS)).toBe(true);
  });
});
