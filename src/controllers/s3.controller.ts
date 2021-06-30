import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';
import AWS from 'aws-sdk';
import { S3Errors } from '../lib/api-error';

const s3Controller = {
  getSignedUrl: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const s3 = new AWS.S3({
      apiVersion: '2012-08-10',
      region: process.env.S3_REGION,
      signatureVersion: 'v4',
    });
    const typeUpload: any = req.query['type_upload'] || '';
    const fileName = req.query['file_name'];
    const fileType = req.query['file_type'];
    const S3_BUCKET = process.env.S3_BUCKET;

    console.log(fileName, fileType);

    if (!fileName || !fileType) throw S3Errors.MISSING_FIELD;

    if (!['avatar', 'post'].includes(typeUpload)) throw S3Errors.UNSUPPORTED;

    const path = `${typeUpload}/${fileName}`;
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: path,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
    try {
      const data = await s3.getSignedUrl('putObject', s3Params);
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${path}`
      };
      return returnData;
    } catch(err) {
      console.log(err);
      throw S3Errors.UNEXPECTED_ERROR;
    }
  }),
}

export default s3Controller;
