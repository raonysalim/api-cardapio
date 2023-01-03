import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'node:fs/promises';

class CheckImg {
  private prisma = new PrismaClient();
  public check = async (id: number) => {
    const checkImg = await this.prisma.itens.findUnique({
      where: { id },
      select: { image: true },
    });
    if (!checkImg?.image) return 'Imagem não encontrada';
    fs.unlink(`${__dirname}/../../public/upload/itens/${checkImg.image}`);
    await this.prisma.itens.update({
      where: { id },
      data: {
        image_url: null,
        image: null,
      },
    });
    return 'Imagem deletada!';
  };

  public middleCheck = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const id = Number(req.params.id);
    const item = await this.prisma.itens.findUnique({
      where: { id },
    });
    if (!item) return res.status(400).json('Item não encontrado');
    await this.check(Number(id));
    next();
  };
}

export const checkImg = new CheckImg();
