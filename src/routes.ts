import { Router } from 'express';
import { Category } from './controller/CategoryController';
import { Item } from './controller/ItemController';
import { User } from './controller/UserController';
import { Jwt } from './middleware/jwt';
import { Upload } from './middleware/multer';
import { checkImg } from './utils/checkImg';

export const routes = Router();

//user routes
routes.post('/admin/login', new User().login);
routes.post('/admin', new Jwt().auth, new User().create);
routes.put('/admin/:id', new Jwt().auth, new User().update);
routes.delete('/admin/:id', new Jwt().auth, new User().delete);

//category routes
routes.get('/category', new Category().findAll);
routes.post('/category', new Category().create);
routes.put('/category/:id', new Category().update);
routes.delete('/category/:id', new Category().delete);

//Itens routes
routes.get('/itens', new Item().findAll);
routes.post('/itens', new Item().create);
routes.put('/itens/:id', new Item().update);
routes.delete('/itens/:id', new Item().delete);

// Image itens routes
routes.post(
  '/itens/image/:id',
  checkImg.middleCheck,
  Upload.uploadImage.single('image'),
  new Item().uploadImage,
);
routes.delete('/itens/image/:id', new Item().deleteImage);
