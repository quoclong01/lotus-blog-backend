import { Request, Response, NextFunction } from 'express';
import { Follower } from '../models/Follower';
import { responseMiddleware } from '../lib/utils';

const followerController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await { status: 200, message: 'Comming soon' };
  }),
  create: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Follower.createFollower(req.body, req.user);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Follower.deleteFollower(req.body, req.user);
  })
};

export default followerController;
