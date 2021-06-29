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
  .route('/public')
  .get(postController.index)
/**
 * @swagger
 *
 * /posts/public:
 *   get:
 *     tags:
 *       - Post
 *     produces:
 *       - application/json
 *     summary:
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

router
  .route('/')
  .get(jwtCheck, postController.index)
  /**
   * @swagger
   *
   * /posts:
   *   get:
   *     tags:
   *       - Post
   *     produces:
   *       - application/json
   *     summary:
   *       Get all posts of following accounts
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
  *     summary:
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
   *     summary:
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
  .put(jwtCheck, postController.updateContent)
  /**
  * @swagger
  *
  * /posts/:id:
  *   put:
  *     tags:
  *       - Post
  *     produces:
  *       - application/json
   *     summary:
   *       Update post
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
  .delete(jwtCheck, postController.delete);
/**
  * @swagger
  *
  * /posts/:id:
  *   delete:
  *     tags:
  *       - Post
  *     produces:
  *       - application/json
  *     summary:
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

  .put(jwtCheck, postController.restore)
/**
  * @swagger
  *
  * /posts/:id/restore:
  *   put:
  *     tags:
  *       - Post
  *     produces:
  *       - application/json
  *     summary:
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
  .route('/:id/likes')

  .get(postController.getlikes)
  /**
  * @swagger
  *
  * /posts/:id/likes:
  *   get:
  *     tags:
  *       - Post
  *     produces:
  *       - application/json
  *     summary:
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
 * /posts/:id/likes:
 *   put:
  *     tags:
  *       - Post
 *     produces:
 *       - application/json
*     summary:
*       Like a post with id, this post will add userId to likes attr 
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
  .route('/:id/comments')

  .get(postController.getcomments)
  /**
 * @swagger
 *
 * /posts/:id/comments:
 *   get:
  *     tags:
  *       - Post
 *     produces:
 *       - application/json
  *     summary:
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
* /posts/:id/comments:
*   put:
*     tags:
*       - Post
*     produces:
*       - application/json
*     summary:
*       Comment a post with id, this post will add userId to comments attr 
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
