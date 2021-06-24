import { APIError } from './api-error';
import HttpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const validate = (schema: any, property: string = 'body') => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req[property]);

    if (error == null) {
      next();
    } else {
      const { details } = error;
      const errors = details.map((i: any) => i.message);
      res.json(
        new APIError(
          HttpStatus['422_NAME'],
          422,
          HttpStatus['422_MESSAGE'],
          errors
        )
      );
    }
  };
};

export const responseMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next))
    .then(data =>  {
      const responseData = data || new APIError(
        HttpStatus['404_NAME'],
        404,
        HttpStatus['404_MESSAGE']
      );
      res.json(responseData);
    })
    .catch(next);
};

export const hashPassword = async(password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export const comparePassword = async(passwordBody: string, password: string) => {
  return await bcrypt.compare(passwordBody, password);
}

export const generateAccessToken = async(auth: any) => {
  return await jwt.sign(
    { userId: auth.userId },
    'RANDOM_TOKEN_SECRET',
    { algorithm: 'HS256', expiresIn: '24h' }
  );
}

export const generateResetToken = async(userId: number) => {
  return await jwt.sign(
    { userId: userId },
    'RANDOM_TOKEN_SECRET',
    { algorithm: 'HS256', expiresIn: '1h' }
  );
}
