import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Jwt } from '../middleware/jwt';

export class User {
  private prisma = new PrismaClient();

  public update = async (req: Request, res: Response) => {
    const { user, password } = req.body;
    const id = Number(req.params.id);
    if (user.length < 3)
      return res
        .status(401)
        .json('O campo "user" precisa ter pelo menos 3 caracteres');

    if (password.length < 5)
      return res
        .status(401)
        .json('O campo "password" precisa ter pelo menos 5 caracteres');
    try {
      const check = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!check) return res.status(400).json('Usuário não encontrado');
      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          user,
          password,
        },
      });
      return res.json(updateUser);
    } catch (e) {
      return res.status(401).json(e);
    }
  };

  public login = async (req: Request, res: Response) => {
    const { user, password } = req.body;
    try {
      const check = await this.prisma.user.findUnique({
        where: {
          user,
        },
      });

      if (!check) return res.status(401).json('Usuário inválido');

      if (password !== check.password)
        return res.status(401).json('Usuário inválido');
      const { token, id } = new Jwt().tokenGen(check.id, check.user);
      res.json({ token, id });
    } catch (e) {
      res.status(401).json('Ocorreu um erro!' + e);
    }
  };
}
