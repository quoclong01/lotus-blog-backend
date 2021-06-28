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
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       title:
   *                         type: string
   *                         example: title example
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
   *               properties:
   *                 isRemoved:
   *                   type: boolean
   *                   example: true
   */
  .post(jwtCheck, validate(bookmarkSchema.addBookmark), bookmarkController.toggleBookmark)

export default router;
