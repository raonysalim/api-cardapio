import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { checkImg } from '../utils/checkImg';

export class Category {
  private prisma = new PrismaClient();

  public create = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
      const newCategory = await this.prisma.category.create({
        data: {
          name,
        },
      });

      return res.json(newCategory);
    } catch (e) {
      return res.status(400).json('Ocorreu um erro ' + e);
    }
  };

  public findAll = async (req: Request, res: Response) => {
    try {
      const allCategories = await this.prisma.category.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return res.json(allCategories);
    } catch (e) {
      res.status(400).json(e);
    }
  };

  public update = async (req: Request, res: Response) => {
    const { name } = req.body;
    const id = Number(req.params.id);

    try {
      const check = await this.prisma.category.findUnique({
        where: {
          id,
        },
      });
      if (!check) return res.status(400).json('Categoria não encontrada');
      const updateCategory = await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return res.json(updateCategory);
    } catch (e) {
      return res.status(400).json('Ocorreu um erro: ' + e);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const check = await this.prisma.category.findUnique({ where: { id } });
      console.log(check);
      if (!check) return res.status(400).json('Categoria não encontrada');
      const teste = await this.prisma.itens.findMany({
        where: {
          categoryId: id,
        },
      });
      teste.forEach(async (v) => {
        v.id;
        await checkImg.check(v.id);
      });

      const deleteCategory = await this.prisma.category.delete({
        where: {
          id,
        },
      });
      return res.json(deleteCategory);
    } catch (e) {
      return res.status(400).json('Ocorreu um erro' + e);
    }
  };
  // public create = async (req: Request, res: Response) => {};
}
