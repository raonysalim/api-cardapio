import multer from 'multer';
import path from 'path';
export class Upload {
  static uploadImage = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public/upload/itens');
      },
      filename: (req, file, cb) => {
        cb(null, req.params.id + path.extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
        (formatoAceito) => formatoAceito == file.mimetype,
      );

      if (extensaoImg) {
        return cb(null, true);
      }

      return cb(null, false);
    },
  });
}

// export const teste = new Upload();
