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
  *     description:
  *       Get all posts with status public
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
  *     description:
  *       Create post
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
   *     description:
  *       Get post with id
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
  *     description:
  *       Delete post with id
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
  *     description:
  *       Restore deleted post with id
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
router
  .route('/:id/like')

  .get(postController.getlikes)
  /**
  * @swagger
  *
  * /api/v1/posts/:id/like:
  *   get:
  *     produces:
  *       - application/json
  *     description:
  *       Get list of users like post with id 
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
  *                  likes:
  *                    type: array
  *                    items:
  *                       type: object
  *                       properties:
  *                         userId:
  *                           type: integer
  *                           example: 1
  *                    
  *                
 */
  .put(postController.like)
/**
 * @swagger
 *
 * /api/v1/posts/:id/like:
 *   put:
 *     produces:
 *       - application/json
*     description:
*       Like a post with id, this post will increase attr like and add userId to likeUsers attr 
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
 *                  likes:
 *                    type: array
 *                    items:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: integer
 *                           example: 1
 *                    
 *                
*/
router
  .route('/:id/comment')

  .get(postController.getcomments)
  /**
 * @swagger
 *
 * /api/v1/posts/:id/comment:
 *   get:
 *     produces:
 *       - application/json
  *     description:
  *       Get list of users commented post with id 
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
 *                  likes:
 *                    type: array
 *                    items:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: integer
 *                           example: 1
 *                    
 *                
*/
  .put(postController.comment)
/**
* @swagger
*
* /api/v1/posts/:id/comment:
*   put:
*     produces:
*       - application/json
*     description:
*       Comment a post with id, this post will increase attr Comment and add userId to CommentUser attr 
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
*                  likes:
*                    type: array
*                    items:
*                       type: object
*                       properties:
*                         userId:
*                           type: integer
*                           example: 1
*                    
*                
*/

export default router;
