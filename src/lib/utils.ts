import { APIError } from './api-error';
import HttpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import expressjwt from 'express-jwt';

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
    .then(data => {
      res.json(data);
    })
    .catch((e) => {
      if (e.status) {
        const statusCode = `${e.status}`.substr(0, 3);
        res.status(+statusCode).json(
          new APIError(
            // @ts-ignore
            HttpStatus[`${statusCode}_NAME`],
            e.status,
            // @ts-ignore
            HttpStatus[`${statusCode}_MESSAGE`],
            e.errors
          )
        );
      } else {
        console.log(e);
        res.status(500).json(
          new APIError(
            // @ts-ignore
            HttpStatus.INTERNAL_SERVER_ERROR,
            e.status,
            // @ts-ignore
            HttpStatus.INTERNAL_SERVER_ERROR,
            e.errors
          )
        );
      }
    });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export const comparePassword = async (passwordBody: string, password: string) => {
  return await bcrypt.compare(passwordBody, password);
}

export const generateAccessToken = async (auth: any) => {
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

export const verifyToken = async (token: any) => {
  try {
    const userId = await jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return userId;
  } catch (error) {
    return error
  }
}
