import { verifyToken } from './../lib/utils';
import { User, Post } from './../models';
import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';

const userController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.findAll({
      order: [['createdAt', 'DESC']]
    });
    return { users: data };
  }),
  getPosts: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.getPosts(req.params.id, req.user);
  }),
  get: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.findUser(req.params.id, req.user);
  }),
  create: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.createUser(req.body);
  }),
  login: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.loginUser(req.body);
  }),
  logout: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.logoutUser(req.user);
  }),
  update: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.updateUserInfo(req.params.id, req.user, req.body);
  }),
  changePassword: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.updateUserPassword(req.user, req.body);
  }),
  resetPassword: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.resetUserPassword(req.body);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.removeUser(req.params.id);
  }),
  restore: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.restorePost(req.params.id, req.user);
  }),
}

export default userController;
