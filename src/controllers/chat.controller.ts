import { Chat } from './../models';
import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';

const chatController = {
  createChat: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Chat.createChat(req.body);
  }),
  userChats: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Chat.userChats(req.params.userId);
  }),
  findChat: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Chat.findChat(req.params);
  }),
}

export default chatController;
