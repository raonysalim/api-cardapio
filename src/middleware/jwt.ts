import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { json } from 'stream/consumers';
dotenv.config();

export class Jwt {
  private secret = process.env.JWT_SECRET;

  public tokenGen = (id: number, user: string): any => {
    const token = jwt.sign({ id: id, user: user }, this.secret as string);
    return { token, id };
  };

  public auth = (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.headers['authorization'];
    if (!token) res.status(401).json('Token inválido');
    token = token.split(' ')[1];
    try {
      const checkToken: Express.Request['user'] = jwt.verify(
        token as string,
        this.secret as jwt.Secret,
      ) as Express.Request['user'];
      req.user = {
        id: checkToken.id,
        user: checkToken.user,
      };
      next();
    } catch (e) {
      res.json('token inválido');
    }
  };
}
