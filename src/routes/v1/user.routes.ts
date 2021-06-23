import express from 'express';
import userController from '../../controllers/user.controller';
import { validate } from '../../lib/utils';
import userSchema from '../../schema/user.schema';
import expressjwt from 'express-jwt';

const router = express.Router();
const jwtCheck = expressjwt({
  secret: 'RANDOM_TOKEN_SECRET',
  algorithms: ['HS256']
});

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
  .post(jwtCheck, userController.logout)

router
  .route('/:id')
  .get(jwtCheck, userController.get)
  .patch(jwtCheck, validate(userSchema.updatePersonalInfo), userController.update)
  .delete(userController.delete)

export default router;
