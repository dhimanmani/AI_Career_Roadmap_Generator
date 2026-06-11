import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { ForbiddenError, UnauthorizedError } from '../common/errors/AppError';
import { Permission, hasAnyPermission } from '../common/permissions';

export function requireRoles(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError('Insufficient role privileges'));
      return;
    }
    next();
  };
}

export function requirePermissions(...permissions: Permission[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    if (!hasAnyPermission(req.user.role, permissions)) {
      next(new ForbiddenError('Insufficient permissions'));
      return;
    }
    next();
  };
}
