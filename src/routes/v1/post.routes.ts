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

const jwtCheckNoRequired = expressjwt({
  secret: 'RANDOM_TOKEN_SECRET',
  algorithms: ['HS256'],
  credentialsRequired: false
});

router
  .route('/public')
  .get(postController.publicIndex)
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
 *     parameters:
 *       - name: size
 *         in: query
 *         description: total posts show in one page 
 *         required: false
 *         example: /posts/public?size=3
 *       - name: page
 *         in: query
 *         description: the number of current page
 *         required: false
 *         example: /posts/public?page=2&size=7
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
  .route('/recommend')
  .get(postController.recommendIndex);
  /**
   * @swagger
   *
   * /posts/recommend:
   *   get:
   *     tags:
   *       - Post
   *     produces:
   *       - application/json
   *     summary:
   *       Get all posts with recommend   
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: Change password successfully.  
  */

router
  .route('/recyclebin')
  .get(jwtCheck, postController.getDeletedPosts);
  /**
   * @swagger
   *
   * /posts/recyclebin:
   *   get:
   *     tags:
   *       - Post
   *     produces:
   *       - application/json
   *     summary:
   *       Get all soft-deleted Posts 
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
  .get(jwtCheck, postController.authIndex)
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
   *     parameters:
   *       - name: size
   *         in: query
   *         description: total posts show in one page 
   *         required: false
   *         example: /posts/public?size=3
   *       - name: page
   *         in: query
   *         description: the number of current page
   *         required: false
   *         example: /posts/public?page=2&size=7
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
  .route('/draft')
  .get(jwtCheck, postController.getDrafts)
  /**
   * @swagger
   *
   * /posts/draft:
   *   get:
   *     tags:
   *       - Draft
   *     produces:
   *       - application/json
   *     summary:
   *       Get all drafts
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
   *                         example: Draft
   *                      userId:
   *                         type: number
   *                         example: 1          
  */
  .post(jwtCheck, postController.newDraft);
/**
  * @swagger
  *
  * /posts/draft:
  *   post:
  *     tags:
  *       - Draft
  *     produces:
  *       - application/json
  *     summary:
  *       Create a draft
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
  *                    example: Create a draft successfully.
  *                  post: 
  *                     type: object
  *                     example: {id: 1, title: title of post, content: content of post, status: Draft}
 */
router
  .route('/:id')

  .get(jwtCheckNoRequired, postController.show)
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
   *       Get post with id. Users only can see the public post detail and all their posts detail (except deleted posts). Notice: if you are a guest (not login), please not set Authorization in request header.
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

  .get(postController.getLikes)
  /**
  * @swagger
  /**
  * @swagger
  *
  * /posts/:id/likes:
  *   get:
  *     tags:
  *       - Reaction
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
  *                  id:
  *                    type: integer
  *                    example: 1
  *                  userId:
  *                    type: integer
  *                    example: 5
  *                  postId:
  *                    type: integer
  *                    example: 11
  *                  user:
  *                    type: object
  *                    properties:
  *                       id:
  *                         type: integer
  *                         example: 111
  *                       email:
  *                         type: integer
  *                         example: a@gmail.com
  *                   
 */
  .put(jwtCheck, postController.like)
/**
 * @swagger
 *
 * /posts/:id/likes:
 *   put:
 *     tags:
 *       - Reaction
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
 *                    type: string
 *                    example: Liked successfully/UnLiked successfully          
 */
router
  .route('/:id/comments')

  .get(postController.getComments)
 /**
  * @swagger
  /**
  * @swagger
  *
  * /posts/:id/comments:
  *   get:
  *     tags:
  *       - Reaction
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
  *                  id:
  *                    type: integer
  *                    example: 1
  *                  userId:
  *                    type: integer
  *                    example: 5
  *                  postId:
  *                    type: integer
  *                    example: 11
  *                  comment:
  *                    type: string
  *                    example: This is new comment
  *                  user:
  *                    type: object
  *                    properties:
  *                       id:
  *                         type: integer
  *                         example: 111
  *                       email:
  *                         type: integer
  *                         example: a@gmail.com
  *                   
 */
  .post(jwtCheck, validate(postchema.addComment), postController.comment)
/**
* @swagger
*
* /posts/:id/comments:
*   post:
*     tags:
*       - Reaction
*     produces:
*       - application/json
*     summary:
*       Comment a post with id, this post will add userId to comments attr 
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               content:
*                 type: string
*                 example: This is comment
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
*                  messages:
*                    type: string
*                    example: Successfully
*                  likes:
*                    type: array
*                    items:
*                       type: object
*                       properties:
*                         id:
*                           type: integer
*                           example: 1
*                         userId:
*                           type: integer
*                           example: 1
*                         postId:
*                           type: integer
*                           example: 1
*                         comment:
*                           type: string
*                           example: This is comment
*                    
*                
*/

export default router;
