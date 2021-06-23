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
  .post(validate(userSchema.login), userController.login)

router
  .route('/logout')
  .post(jwtCheck, userController.logout)

router
  .route('/:id')
  .get(jwtCheck, userController.get)
  .patch(jwtCheck, validate(userSchema.updatePersonalInfo), userController.update)
  .delete(userController.delete)

router
  .route('/:id/post')
/**
  * @swagger
  *
  * /api/v1/users/:id/post:
  *   get:
  *     produces:
  *       - application/json
  *     responses:
  *       200:
 *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                  id:
  *                    type: integer
  *                    example: 1
  *                  posts:
  *                    type: array
  *                    items:
  *                       type: object
  *                       properties:
  *                         id:
  *                           type: integer
  *                           example: 1
  *                         title:
  *                           type: string
  *                           example: title of post
  *                         content:
  *                           type: string
  *                           example: content of post
  *                         status:
  *                           type: string
  *                           example: public
  *                       
 */
export default router;
