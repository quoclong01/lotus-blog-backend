import { Post } from './../models/Post';
import { Request, Response, NextFunction } from 'express';
import { Follower } from '../models/Follower';
import { responseMiddleware } from '../lib/utils';

const followerController = {
  create: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return { api: 'add followers' }
  })
};

export default followerController;
