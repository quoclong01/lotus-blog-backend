import { Post } from './../models/Post';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { responseMiddleware } from '../lib/utils';

const userController = {
  getAll: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.findAll({
      order: [['createdAt', 'DESC']]
    });
    return { users: data };
  }),
  getPost: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.findOne({
      where: { id: req.params.id }, include: { model: Post, as: 'Posts', required: false }
    });
    return { users: data };
  }),
  create: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.createUser(req.body);
  }),
  updateUser: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.updateUserInfo(req.params.id);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.removeUser(req.params.id);
  })
}

export default userController;
