import { Message } from '../models';
import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';


const messageController = {
  addMessages: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { chatId, senderId, text } = req.body;
    const message = new Message({
      chatId, senderId, text
    });
    
    try {
      const result = await message.save();
      return result;
    }
    catch (error) {
      throw new Error(error);
    }

  }),
  getMessages: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;

    try {
      const data = await Message.findAll({
        where: {
          chatId
        },
      });
      return data;
    }
    catch (error) {
      throw new Error(error);
    }
  }),
}

export default messageController;
