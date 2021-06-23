import express from 'express';
import userController from '../../controllers/user.controller';
import { validate } from '../../lib/utils';
import userSchema from '../../schema/user.schema';

const router = express.Router();

router
  .route('/')
  .get(userController.index)

router
  .route('/register')
  .post(validate(userSchema.addUser), userController.create)

router
  .route('/login')
  /**
   * @swagger
   *
   * /login:
   *   post:
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         in: body
   *         required: true
   *         type: string
   *       - name: password
   *         in: body
   *         required: true
   *         type: string
   */
  .post(validate(userSchema.login), userController.login)

router
  .route('/logout')
  .post(validate(userSchema.logout), userController.logout)

router
  .route('/:id')
  .patch(userController.update)
  .delete(userController.delete)

export default router;
