import { Router } from 'express';
import { authController } from './auth.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate.middleware';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.schema';
import { authRateLimiter } from '../middleware/rateLimit.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: Alex Rivera }
 *               email: { type: string, example: alex@university.edu }
 *               password: { type: string, example: SecurePass1 }
 *               role: { type: string, enum: [STUDENT, MENTOR] }
 *     responses:
 *       201:
 *         description: User registered
 *       409:
 *         description: Email already exists
 */
router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  asyncHandler((req, res) => authController.register(req, res))
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 */
router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  asyncHandler((req, res) => authController.login(req, res))
);

router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  asyncHandler((req, res) => authController.refresh(req, res))
);

router.post(
  '/logout',
  authenticate,
  asyncHandler((req, res) => authController.logout(req, res))
);

router.post(
  '/verify-email',
  validate(verifyEmailSchema),
  asyncHandler((req, res) => authController.verifyEmail(req, res))
);

router.post(
  '/forgot-password',
  authRateLimiter,
  validate(forgotPasswordSchema),
  asyncHandler((req, res) => authController.forgotPassword(req, res))
);

router.post(
  '/reset-password',
  authRateLimiter,
  validate(resetPasswordSchema),
  asyncHandler((req, res) => authController.resetPassword(req, res))
);

export default router;
