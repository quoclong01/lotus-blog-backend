import express from 'express';
import postController from '../../controllers/post.controller';
import { validate } from '../../lib/utils';
import postchema from '../../schema/post.schema';

const router = express.Router();

router
  .route('/')

  .get(postController.index)
  /**
   * @swagger
   *
   * /api/v1/posts:
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
   *                 posts:
   *                   type: array
   *                   items:
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
   *                      status:
   *                         type: string
   *                         example: public
   *                      userId:
   *                         type: number
   *                         example: 1          
  */
  .post(validate(postchema.addPost), postController.new);
/**
  * @swagger
  *
  * /api/v1/posts:
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
  *               title:
  *                 type: string
  *                 example: title of post
  *               content:
  *                 type: string
  *                 example: content of post
  *               status:
  *                 type: string
  *                 example: public/private
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
  *                    example: Create a post successfully.
  *                  post: 
  *                     type: object
  *                     example: {id: 1, title: title of post, content: content of post, status: public}
 */
router
  .route('/:id')

  .get(postController.show)
  /**
   * @swagger
   *
   * /api/v1/posts/:id:
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
   *                      id:
   *                        type: integer
   *                        example: 1
   *                      title:
   *                        type: string
   *                        example: title of post
   *                      content:
   *                         type: string
   *                         example: this is content of post
   *                      status:
   *                         type: string
   *                         example: public
   *                      userId:
   *                         type: number
   *                         example: 1          
  */
  .put(postController.updateContent)
  /**
  * @swagger
  *
  * /api/v1/posts/:id:
  *   put:
  *     produces:
  *       - application/json
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               title:
  *                 type: string
  *                 example: update title
  *               content:
  *                 type: string
  *                 example: update content
  *               status:
  *                 type: string
  *                 example: update status
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
  *                    example: Update successfully.
  *                  post: 
  *                     type: object
  *                     example: {id: 1, title: update title, content: update content, status: update status}
 */
  .delete(postController.delete);
/**
  * @swagger
  *
  * /api/v1/posts/:id:
  *   delete:
  *     produces:
  *       - application/json
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
  *                    example: Delete post successfully.
  *                
 */
router
  .route('/:id/restore')

  .put(postController.restore)
/**
  * @swagger
  *
  * /api/v1/posts/:id/restore:
  *   put:
  *     produces:
  *       - application/json
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
  *                    example: Restore post successfully.
  *                
 */

export default router;
