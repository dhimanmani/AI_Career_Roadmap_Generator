import { prisma } from '../../database/prisma';
import { NotFoundError } from '../../common/errors/AppError';
import type { UpdateUserInput } from './users.schema';

export class UsersService {
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
      },
    });

    if (!user) throw new NotFoundError('User');
    return user;
  }

  async updateMe(userId: string, input: UpdateUserInput) {
    return prisma.user.update({
      where: { id: userId },
      data: input,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        isVerified: true,
        updatedAt: true,
      },
    });
  }

  async deleteMe(userId: string) {
    await prisma.user.delete({ where: { id: userId } });
    return { message: 'Account deleted successfully' };
  }
}

export const usersService = new UsersService();
