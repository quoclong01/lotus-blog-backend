import { Message } from '../models';
import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';


const chatController = {
  addMessages: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { chatId, senderId, text } = req.body;
    const message = new Message({
      chatId, senderId, text
    });
    
    try {
      const result = await message.save();
      res.status(200).json(result);
    }
    catch (error) {
      res.status(500).json(error);
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
      res.status(200).json(data);
    }
    catch (error) {
      res.status(500).json(error);
    }

  }),
}

export default chatController;
