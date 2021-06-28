import { verifyToken } from './../lib/utils';
import { User, Post, Follower } from './../models';
import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';
import { UserErrors } from '../lib/api-error';

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
  getFollowers: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const authInfo: any = req.user;

    if (req.params.id !== 'me') throw UserErrors.INTERACT_PERMISSION;

    const data = await User.findOne({
      where: { id: authInfo.userId },
      include: [{
        model: Follower,
        as: 'followers',
        attributes: ['followerId']
      }]
    });

    if (!data) throw UserErrors.NOT_FOUND;

    return { users: data };
  }),
  getFollowings: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const authInfo: any = req.user;

    if (req.params.id !== 'me') throw UserErrors.INTERACT_PERMISSION;

    const data = await User.findOne({
      where: { id: authInfo.userId },
      include: [{
        model: Follower,
        as: 'followings',
        attributes: ['followedId']
      }]
    });

    if (!data) throw UserErrors.NOT_FOUND;

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
