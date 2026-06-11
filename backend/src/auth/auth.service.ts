import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '@prisma/client';
import { authRepository } from './auth.repository';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  parseExpiresInToMs,
} from '../utils/jwt';
import { env } from '../config/env';
import { ConflictError, UnauthorizedError, ValidationError } from '../common/errors/AppError';
import { logger } from '../config/logger';
import { analyticsService } from '../modules/analytics/analytics.service';
import type { RegisterInput, LoginInput } from './auth.schema';

const SALT_ROUNDS = 12;

export class AuthService {
  private sanitizeUser(user: {
    id: string;
    name: string;
    email: string;
    role: Role;
    isVerified: boolean;
    createdAt: Date;
    profileImage?: string | null;
  }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage ?? null,
      createdAt: user.createdAt,
    };
  }

  private async issueTokens(user: { id: string; email: string; role: Role; name: string }) {
    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const refreshToken = signRefreshToken({ sub: user.id });
    const expiresAt = new Date(Date.now() + parseExpiresInToMs(env.JWT_REFRESH_EXPIRES_IN));

    await authRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    return { accessToken, refreshToken };
  }

  async register(input: RegisterInput) {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    if (input.role !== Role.STUDENT && input.role !== Role.MENTOR) {
      throw new ValidationError('Only STUDENT or MENTOR roles allowed during registration');
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await authRepository.createUser({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
    });

    const verificationToken = uuidv4();
    await authRepository.createVerificationToken(
      user.id,
      verificationToken,
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    logger.info(`Verification link: ${env.APP_URL}/verify-email?token=${verificationToken}`);

    const tokens = await this.issueTokens({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    await analyticsService.trackEvent(user.id, 'ACCOUNT_REGISTERED');

    return { user: this.sanitizeUser(user), ...tokens };
  }

  async login(input: LoginInput) {
    const user = await authRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const tokens = await this.issueTokens({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    const stored = await authRepository.findRefreshToken(refreshToken);
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    try {
      verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    await authRepository.revokeRefreshToken(refreshToken);

    const tokens = await this.issueTokens({
      id: stored.user.id,
      email: stored.user.email,
      role: stored.user.role,
      name: stored.user.name,
    });

    return tokens;
  }

  async logout(refreshToken?: string, userId?: string) {
    if (refreshToken) {
      try {
        await authRepository.revokeRefreshToken(refreshToken);
      } catch {
        // Token may already be revoked
      }
    }
    if (userId) {
      await authRepository.revokeAllUserTokens(userId);
    }
  }

  async verifyEmail(token: string) {
    const record = await authRepository.findVerificationToken(token);
    if (!record || record.expiresAt < new Date()) {
      throw new ValidationError('Invalid or expired verification token');
    }

    await authRepository.markUserVerified(record.userId);
    await authRepository.deleteVerificationToken(token);

    return { message: 'Email verified successfully' };
  }

  async forgotPassword(email: string) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const token = uuidv4();
    await authRepository.createPasswordResetToken(
      user.id,
      token,
      new Date(Date.now() + 60 * 60 * 1000)
    );

    logger.info(`Password reset link: ${env.APP_URL}/reset-password?token=${token}`);

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(token: string, password: string) {
    const record = await authRepository.findPasswordResetToken(token);
    if (!record || record.usedAt || record.expiresAt < new Date()) {
      throw new ValidationError('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await authRepository.updatePassword(record.userId, hashedPassword);
    await authRepository.markPasswordResetUsed(token);
    await authRepository.revokeAllUserTokens(record.userId);

    return { message: 'Password reset successfully' };
  }
}

export const authService = new AuthService();
