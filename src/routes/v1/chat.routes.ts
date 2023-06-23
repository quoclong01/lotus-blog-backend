import express from 'express';
import chatController from '../../controllers/chat.controller';
const router = express.Router();

router.post('/', chatController.createChat);
router.get('/:userId', chatController.userChats);
router.get('/find/:firstId/:secondId', chatController.findChat);

export default router;
