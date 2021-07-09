import express from 'express';
import expressjwt from 'express-jwt';
import { validate } from '../../lib/utils';
import bookmarkSchema from '../../schema/bookmark.schema';
import bookmarkController from '../../controllers/bookmark.controller';

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
   * /bookmarks/:
   *   get:
   *     tags:
   *       - Bookmark
   *     produces:
   *       - application/json
   *     summary:
   *       List all posts in my bookmark
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                  id:
   *                    type: integer
   *                    example: 1
   *                  userId:
   *                    type: integer
   *                    example: 1
   *                  postId:
   *                    type: integer
   *                    example: 1
   *                  post:
   *                     type: object
   *                     properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      title:
 *                        type: string
 *                        example: title of post
 *                      content:
 *                         type: string
 *                         example: this is content of post
 *                      tags:
 *                         type: array
 *                         items:
 *                          type: string
 *                          example: React
 *                      status:
 *                         type: string
 *                         example: public
 *                      userId:
 *                         type: number
 *                         example: 1          
 *                      likes:
 *                         type: number
 *                         example: 1          
 *                      comments:
 *                         type: number
 *                         example: 1          
 *                      cover:
 *                         type: number
 *                         example: 1          
 *                      recommend:
 *                         type: boolean
 *                         example: true          
 *                      user:
 *                         type: object
 *                         properties:
 *                          id:
 *                            type: number
 *                            example: 55    
 *                          email:
 *                            type: string
 *                            example: test@gmail.com    
 *                          firstName:
 *                            type: string
 *                            example: test    
 *                          lastName:
 *                            type: string
 *                            example: test    
 *                          phone:
 *                            type: string
 *                            example: 099999999  
   *                  
   */
  .get(jwtCheck, bookmarkController.listMyBookmark)
  
  /**
   * @swagger
   *
   * /bookmarks/:
   *   post:
   *     tags:
   *       - Bookmark
   *     produces:
   *       - application/json
   *     summary:
   *       Toggle post in my bookmark.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *              - postId
   *             properties:
   *              postId:
   *                type: number
   *                example: 1
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 isAdded:
   *                   type: boolean
   *                   example: true
   *       201:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               example: { isInBookmark: true|false }
   */
  .post(jwtCheck, validate(bookmarkSchema.addBookmark), bookmarkController.toggleBookmark)

export default router;
