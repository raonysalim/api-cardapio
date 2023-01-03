import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { checkImg } from '../utils/checkImg';

export class Item {
  private prisma = new PrismaClient();

  public create = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;
    const categoryId = Number(req.body.categoryId);

    try {
      const newItem = await this.prisma.itens.create({
        data: {
          name,
          description,
          price,
          categoryId,
        },
      });

      return res.json(newItem);
    } catch (e) {
      return res.status(400).json('Ocorreu um erro ' + e);
    }
  };

  public findAll = async (req: Request, res: Response) => {
    let categoryId = Number(req.params.categoryId);
    categoryId ? categoryId : (categoryId = 0);
    try {
      const allItens = await this.prisma.itens.findMany({
        orderBy: {
          name: 'asc',
        },
        where: {
          categoryId,
        },
        include: {
          category: true,
        },
      });
      console.log(req.user);
      return res.json(allItens);
    } catch (e) {
      res.status(400).json(e);
    }
  };

  public update = async (req: Request, res: Response) => {
    const { name, description, categoryId, price } = req.body;
    const id = Number(req.params.id);
    console.log(req.body);
    try {
      const check = await this.prisma.itens.findUnique({
        where: {
          id,
        },
      });

      if (!check) return res.status(400).json('Item não encontrado');

      const updateItem = await this.prisma.itens.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          price,
          categoryId,
        },
      });
      return res.json(updateItem);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: { e } });
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const check = await this.prisma.itens.findUnique({
        where: {
          id,
        },
      });
      if (!check) return res.status(400).json('Item não encontrado');
      await checkImg.check(id);
      await this.prisma.itens.delete({
        where: {
          id,
        },
      });

      return res.json(await checkImg.check(id));
    } catch (e) {
      res.status(400).json('Ocorreu um erro: ' + e);
    }
  };

  public uploadImage = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (req.file) {
      const check = await this.prisma.itens.update({
        where: { id },
        data: {
          image_url: 'http://localhost:3000/itens/' + req.file.filename,
          image: req.file.filename,
        },
      });
      return res.json({ category: check });
    }
    return res
      .status(400)
      .json('Erro, certifique-se que o formato da imagem está correto');
  };

  public deleteImage = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    res.json(await checkImg.check(id));
  };
}
