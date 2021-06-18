import express from 'express';
import userController from '../../controllers/user.controller';
import { validate } from '../../lib/utils';
import userSchema from '../../schema/user.schema';

const router = express.Router();

router
  .route('/')
  .get(userController.getAll)

router
  .route('/signup')
  .post(validate(userSchema.addUser), userController.create)

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.delete)

export default router;