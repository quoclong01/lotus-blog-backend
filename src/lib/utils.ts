import { APIError } from './api-error';
import HttpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

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
