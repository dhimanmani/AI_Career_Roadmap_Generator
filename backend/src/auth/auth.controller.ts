import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../utils/apiResponse';
import { env } from '../config/env';

function setTokenCookies(res: Response, accessToken: string, refreshToken: string): void {
  const refreshMaxAge = 7 * 24 * 60 * 60 * 1000;
  const accessMaxAge = 15 * 60 * 1000;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    domain: env.COOKIE_DOMAIN,
    maxAge: accessMaxAge,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    domain: env.COOKIE_DOMAIN,
    maxAge: refreshMaxAge,
  });
}

function clearTokenCookies(res: Response): void {
  res.clearCookie('accessToken', { domain: env.COOKIE_DOMAIN });
  res.clearCookie('refreshToken', { domain: env.COOKIE_DOMAIN });
}

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const result = await authService.register(req.body);
    setTokenCookies(res, result.accessToken, result.refreshToken);
    sendSuccess(res, { user: result.user, accessToken: result.accessToken, refreshToken: result.refreshToken }, 'Registration successful', 201);
  }

  async login(req: Request, res: Response): Promise<void> {
    const result = await authService.login(req.body);
    setTokenCookies(res, result.accessToken, result.refreshToken);
    sendSuccess(res, { user: result.user, accessToken: result.accessToken, refreshToken: result.refreshToken }, 'Login successful');
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken ?? req.cookies?.refreshToken;
    const tokens = await authService.refresh(refreshToken);
    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
    sendSuccess(res, tokens, 'Token refreshed');
  }

  async logout(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken ?? req.cookies?.refreshToken;
    await authService.logout(refreshToken, req.user?.id);
    clearTokenCookies(res);
    sendSuccess(res, null, 'Logged out successfully');
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    const result = await authService.verifyEmail(req.body.token);
    sendSuccess(res, result);
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const result = await authService.forgotPassword(req.body.email);
    sendSuccess(res, result);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const result = await authService.resetPassword(req.body.token, req.body.password);
    sendSuccess(res, result);
  }
}

export const authController = new AuthController();
