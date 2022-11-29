import express from 'express';
import path from 'node:path';
import 'reflect-metadata';
import { routes } from './routes';
import { Admin } from './utils/createAdmin';

export default class App {
  private app = express();

  public listen(): void {
    new Admin().checkAdmin();
    this.app.use(express.json());
    this.app.use(
      express.static(path.resolve(__dirname, '..', 'public', 'upload')),
    );
    this.app.use(routes);
    this.app.listen(3000, () => {
      console.log('Servidor rodando!');
    });
  }
}
