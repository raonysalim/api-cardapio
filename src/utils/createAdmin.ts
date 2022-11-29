import { PrismaClient } from '@prisma/client';

export class Admin {
  private prisma = new PrismaClient();
  public checkAdmin = async (): Promise<void> => {
    const check = await this.prisma.user.findMany();
    if (check.length > 0) return;

    await this.prisma.user.create({
      data: {
        user: 'admin',
        password: 'admin',
      },
    });
  };
}
