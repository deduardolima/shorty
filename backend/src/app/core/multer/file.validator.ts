import { Injectable } from "@nestjs/common";
import multer from "multer";
@Injectable()
export class ValidatorUpload {

  fileFilter() {
    return (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      const allowed = [process.env.MULTER_TYPES];
      if (allowed.includes(file.mimetype)) {
        return cb(null, true)
      };
      req.fileValidationError = `Somente os arquivos ${process.env.MULTER_TYPES} são aceitos`
      return cb(null, true)
    }

  }

}  