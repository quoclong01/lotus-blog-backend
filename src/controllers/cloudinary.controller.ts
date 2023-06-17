import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';
import { S3Errors } from '../lib/api-error';

const cloudinary = require("cloudinary").v2;
const cloudinaryController = {
  getSignedUrl: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });

    const typeUpload: any = req.query['type_upload'] || '';
    const fileName = req.query['file_name'];
    const fileType = req.query['file_type'];

    const options = {
      overwrite: true,
      invalidate: true,
      resource_type: "auto",
    };

    if (!fileName || !fileType) throw S3Errors.MISSING_FIELD;

    if (!['avatar', 'cover-post', 'content-post'].includes(typeUpload)) throw S3Errors.UNSUPPORTED;

    const __dirname = 'D:/DATN/Images/';
    const path = `${__dirname}${fileName}`;
    
    const result = await cloudinary.uploader.upload(path, options);
    try {
      const data = {
        signedRequest: result,
        url: result.secure_url
      }
      return data;
    }
    catch (e: any) {
      throw S3Errors.UNEXPECTED_ERROR;
    }
  }),
}

export default cloudinaryController;
