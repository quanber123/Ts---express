import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { config } from 'dotenv';
config();
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

class UploadService {
  private upload: multer.Multer;

  constructor() {
    this.upload = multer({
      storage: multer.diskStorage({
        destination: this.destinationPath,
        filename: this.filenameHandler,
      }),
      limits: { fileSize: 25 * 1024 * 1024 }, // Limit file size to 25MB
      fileFilter: this.fileFilterHandler,
    });
  }

  private destinationPath(
    req: Request,
    file: Express.Multer.File,
    cb: any
  ): void {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedImageExtensions.includes(fileExtension)) {
      const uploadPath =
        process.env.ENVIRONMENT === 'production'
          ? 'public/uploads'
          : 'public/test';
      // Create directory if it doesn't exist
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } else {
      return cb(new Error('Invalid file format.'), '');
    }
  }

  private filenameHandler(
    req: Request,
    file: Express.Multer.File,
    cb: any
  ): void {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + '-' + file.originalname;
    cb(null, filename);
  }

  private fileFilterHandler(
    req: Request,
    file: Express.Multer.File,
    cb: any
  ): void {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedImageExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format.'), false);
    }
  }

  // public getUploadMiddleware() {
  //   return this.upload;
  // }

  public getUploadFields() {
    return this.upload.fields([
      { name: 'images', maxCount: 10 },
      { name: 'avatar', maxCount: 1 },
    ]);
  }
}

const uploadService = new UploadService();
// const uploadMiddleware = uploadService.getUploadMiddleware();
const uploadFields = uploadService.getUploadFields();

export { uploadFields };
