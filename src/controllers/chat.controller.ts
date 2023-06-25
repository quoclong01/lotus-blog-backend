import { Chat } from './../models';
import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';

const chatController = {
  createChat: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const member = [req.body.senderId, req.body.receiverId];
    const newChat = new Chat({
      members: JSON.parse(JSON.stringify(member))
    });
    try {
      const result = await newChat.save();
      return result;
    }
    catch (error: any) {
      return error;
    }
  }),
  userChats: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Chat.userChats(req.params.userId);
  }),
  findChat: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Chat.findChat(req.params);
  }),
}

export default chatController;
