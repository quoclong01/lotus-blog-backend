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
  /**
   * @swagger
   *
   * /users/:
   *   get:
  *     tags:
  *       - User
   *     produces:
   *       - application/json
   *     summary:
  *       Get information of account
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 users:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                      id:
   *                        type: integer
   *                        example: 1
   *                      email:
   *                        type: string
   *                        example: quan.do@supremetech.vn
   *                      firstName:
   *                         type: string
   *                         example: do
   *                      lastName:
   *                         type: string
   *                         example: quan
   *                      phone:
   *                         type: string
   *                         example: ''
   *                      gender:
   *                         type: string
   *                         example: male
   *                      dob:
   *                         type: string
   *                         example: 19/10/1995
   *                      displayName:
   *                         type: string
   *                         example: quanDo
   *                      picture:
   *                         type: string
   *                         example: ''
   *                      isActive:
   *                         type: boolean
   *                         example: true
  */
  .get(userController.index)

router
  .route('/register')
  /**
   * @swagger
   *
   * /users/register:
   *   post:
  *     tags:
  *       - Auth
   *     produces:
   *       - application/json
   *     summary:
  *       Register a new account
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: quan.do@supremetech.vn
   *               password:
   *                 type: string
   *                 example: abc@1234
   *               firstName:
   *                 type: string
   *                 example: do
   *               lastName:
   *                 type: string
   *                 example: quan
   *               gender:
   *                 type: string
   *                 example: male
   *               dob:
   *                 type: string
   *                 example: 19/10/1995
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  status:
   *                    type: integer
   *                    example: 200
   *                  message:
   *                    type: string
   *                    example: Create an account successfully.
  */
  .post(validate(userSchema.addUser), userController.create)

router
  .route('/login')
  /**
 * @swagger
 *
 * /users/login:
 *   post:
  *     tags:
  *       - Auth
 *     produces:
 *       - application/json
   *     summary:
  *       Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: quan.do@supremetech.vn
 *               password:
 *                 type: string
 *                 example: abc@1234
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  accessToken:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNDQzOTkwNiwiZXhwIjoxNjI0NTI2MzA2fQ.Mqz4M54mv3bA3RXdSnSgulJnVnCvFSCfUW00qz0yKiA
 *                  userInfo:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      email:
 *                        type: string
 *                        example: quan.do@supremetech.vn
 *                      firstName:
 *                         type: string
 *                         example: do
 *                      lastName:
 *                         type: string
 *                         example: quan
 *                      phone:
 *                         type: string
 *                         example: ''
 *                      gender:
 *                         type: string
 *                         example: male
 *                      dob:
 *                         type: string
 *                         example: 19/10/1995
 *                      displayName:
 *                         type: string
 *                         example: quanDo
 *                      picture:
 *                         type: string
 *                         example: ''
 *                      isActive:
 *                         type: boolean
 *                         example: true
*/
  .post(validate(userSchema.login), userController.login)

router
  .route('/logout')
  /**
   * @swagger
   *
   * /users/logout:
   *   post:
  *     tags:
  *       - Auth
   *     produces:
   *       - application/json
   *     summary:
  *       Logout
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  statusCode:
   *                    type: integer
   *                    example: 200
   *                  message:
   *                    type: string
   *                    example: Logout successfully.
   */
  .post(jwtCheck, userController.logout)

router
  .route('/:id')
  /**
   * @swagger
   *
   * /users/{id}:
   *   put:
    *     tags:
    *       - User
   *     produces:
   *       - application/json
   *     summary:
  *       Update account's information
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: string
   *           example: me
   *     security:
   *       - jwt: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *                 example: do
   *               lastName:
   *                 type: string
   *                 example: quan
   *               phone:
   *                 type: string
   *                 example: '0909090909'
   *               gender:
   *                 type: string
   *                 example: male
   *               dob:
   *                 type: string
   *                 example: 19/10/1995
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  userInfo:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       email:
   *                         type: string
   *                         example: quan.do@supremetech.vn
   *                       firstName:
   *                          type: string
   *                          example: do
   *                       lastName:
   *                          type: string
   *                          example: quan
   *                       displayName:
   *                          type: string
   *                          example: quanDo
   *                       picture:
   *                          type: string
   *                          example: ''
   *                       isActive:
   *                          type: boolean
   *                          example: true
   */
  .get(jwtCheck, userController.get)
  .put(jwtCheck, validate(userSchema.updatePersonalInfo), userController.update)
  .delete(userController.delete)

router
  .route('/:id/post')
/**
  * @swagger
  *
  * /users/:id/post:
  *   get:
  *     tags:
  *       - User
  *     produces:
  *       - application/json
   *     summary:
  *       Get list of posts with userId
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
.get(userController.getPost)

router
  .route('/:id/followers')
  .get(jwtCheck, userController.getFollowers)
  /**
   * @swagger
   * /users/{id}/followers:
   *   get:
   *     summary: Get all followers by user ID
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: string
   *           example: me
   *     produces:
   *       - application/json
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               example: { users: { id: 3, email: quan.do@supremetech.vn, followings: [{ followerId: 1 }] } }
   */

router
  .route('/:id/followings')
  .get(jwtCheck, userController.getFollowings)
  /**
   * @swagger
   * /users/{id}/followings:
   *   get:
   *     summary: Get all followings by user ID
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: string
   *           example: me
   *     produces:
   *       - application/json
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               example: { users: { id: 3, email: quan.do@supremetech.vn, followers: [{ followedId: 2 }] } }
   */

export default router;
