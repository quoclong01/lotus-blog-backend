import express from 'express';
import userController from '../../controllers/user.controller';
import { validate } from '../../lib/utils';
import userSchema from '../../schema/user.schema';

const router = express.Router();

router
  .route('/')
  /**
   * @swagger
   *
   * /api/v1/users/:
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
   *                 users:
   *                   type: array
   *                   items:
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
  .get(userController.index)

router
  .route('/register')
  /**
   * @swagger
   *
   * /api/v1/users/register:
   *   post:
   *     produces:
   *       - application/json
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
   *                  statusCode:
   *                    type: integer
   *                    example: 200
   *                  message:
   *                    type: string
   *                    example: Create an account successfully
  */
  .post(validate(userSchema.addUser), userController.create)

router
  .route('/login')
    /**
   * @swagger
   *
   * /api/v1/users/login:
   *   post:
   *     produces:
   *       - application/json
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
  */
  .post(validate(userSchema.login), userController.login)

router
  .route('/logout')
  /**
   * @swagger
   *
   * /api/v1/users/logout:
   *   post:
   *     produces:
   *       - application/json
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
  .post(validate(userSchema.logout), userController.logout)

router
  .route('/:id')
  /**
   * @swagger
   *
   * /api/v1/users/{id}:
   *   patch:
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: integer
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
   *                 example: 0909090909
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
   * 
   *   delete:
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: integer
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
   *                    example: Delete the user successfully.
   */
  .patch(userController.update)
  .delete(userController.delete)

export default router;
