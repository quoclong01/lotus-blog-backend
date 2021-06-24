import express from 'express';
import postController from '../../controllers/post.controller';
import { validate } from '../../lib/utils';
import postchema from '../../schema/post.schema';
import expressjwt from 'express-jwt';

const router = express.Router();
const jwtCheck = expressjwt({
  secret: 'RANDOM_TOKEN_SECRET',
  algorithms: ['HS256']
});


router
  .route('/')

  .get(postController.index)
  /**
   * @swagger
   *
   * /posts:
   *   get:
   *     tags:
   *       - Post
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
  .post(jwtCheck, validate(postchema.addPost), postController.new);
/**
  * @swagger
  *
  * /posts:
  *   post:
  *     tags:
  *       - Post
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
   * /posts/:id:
   *   get:
  *     tags:
  *       - Post
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
  * /posts/:id:
  *   put:
  *     tags:
  *       - Post
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
  * /posts/:id:
  *   delete:
  *     tags:
  *       - Post
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
  * /posts/:id/restore:
  *   put:
  *     tags:
  *       - Post
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
  * /posts/:id/like:
  *   get:
  *     tags:
  *       - Post
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
 * /posts/:id/like:
 *   put:
  *     tags:
  *       - Post
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
 * /posts/:id/comment:
 *   get:
  *     tags:
  *       - Post
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
* /posts/:id/comment:
*   put:
*     tags:
*       - Post
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
