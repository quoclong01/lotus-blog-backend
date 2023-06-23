import express from 'express';
import messageController from '../../controllers/message.controller';
const router = express.Router();

router.post('/', messageController.addMessages);
router.get('/:chatId', messageController.getMessages);

export default router;
