import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { responseMiddleware } from '../lib/utils';

const userController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    const data = await User.findAll({
      order: [ ['createdAt', 'DESC'] ]
    });
    return { users: data };
  }),
  create: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    return await User.createUser(req.body);
  }),
  login: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.loginUser(req.body);
  }),
  logout: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.logoutUser(req.body);
  }),
  update: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    return await User.updateUserInfo(+req.params.id, req.body);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    return await User.removeUser(req.params.id);
  })
}

export default userController;
