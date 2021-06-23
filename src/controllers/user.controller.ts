import { verifyToken, generateAccessToken } from './../lib/utils';
import { Post } from './../models/Post';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { responseMiddleware } from '../lib/utils';

const userController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.findAll({
      order: [['createdAt', 'DESC']]
    });
    return { users: data };
  }),
  getPost: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token;
    const { userId } = await verifyToken(token);
    let data;
    if (JSON.stringify(userId) === req.params.id) {
      data = await User.findOne({
        attributes: ['id'],
        where: { id: req.params.id }, include: { model: Post, as: 'Posts', required: false }
      });
    }
    else {
      data = await User.findOne({
        attributes: ['id'],
        where: { id: req.params.id }, include: { model: Post, as: 'Posts', where: { status: 'public' }, required: false }
      });
    }
    return { users: data };
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
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await User.removeUser(req.params.id);
  }),
  restore: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.restorePost(req.params.id);
  }),
}

export default userController;
