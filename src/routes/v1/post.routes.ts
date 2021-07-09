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
 *                 data:
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
 *                 totalPage:
 *                   type: integer
 *                   example: 12
 *                 totalItems:
 *                   type: integer
 *                   example: 112
 *                 itemsPerPage:
 *                   type: integer
 *                   example: 12
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 loadMore:
 *                   type: boolean
 *                   example: true
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
 *                 data:
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
 *                 totalPage:
 *                   type: integer
 *                   example: 12
 *                 totalItems:
 *                   type: integer
 *                   example: 112
 *                 itemsPerPage:
 *                   type: integer
 *                   example: 12
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 loadMore:
 *                   type: boolean
 *                   example: true
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
 *                 data:
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
 *                 totalPage:
 *                   type: integer
 *                   example: 12
 *                 totalItems:
 *                   type: integer
 *                   example: 112
 *                 itemsPerPage:
 *                   type: integer
 *                   example: 12
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 loadMore:
 *                   type: boolean
 *                   example: true
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
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
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
 *                 totalPage:
 *                   type: integer
 *                   example: 12
 *                 totalItems:
 *                   type: integer
 *                   example: 112
 *                 itemsPerPage:
 *                   type: integer
 *                   example: 12
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 loadMore:
 *                   type: boolean
 *                   example: true
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
  *             required:
  *               - title
  *               - cover
  *               - content
  *               - status
  *               - description
  *             properties:
  *               title:
  *                 type: string
  *                 example: title of post
  *               cover:
  *                 type: string
  *                 example: cover
  *               content:
  *                 type: string
  *                 example: content of post
  *               status:
  *                 type: string
  *                 example: public/private
  *               description:
  *                 type: string
  *                 example: description of post
  *               tags:
  *                 type: array
  *                 items:
  *                   type: string
  *                   example: React
  * 
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
 *                   tags:
 *                      type: array
 *                      items:
 *                       type: string
 *                       example: 
 *                   likes:
 *                      type: integer
 *                      example: 0
 *                   comments:
 *                      type: integer
 *                      example: 0
 *                   recommend:
 *                      type: boolean
 *                      example: false
 *                   id:
 *                      type: integer
 *                      example: 100
 *                   title:
 *                      type: string
 *                      example: title
 *                   description:
 *                      type: string
 *                      example: description
 *                   content:
 *                      type: string
 *                      example: content
 *                   status:
 *                      type: string
 *                      example: private
 *                   userId:
 *                      type: integer
 *                      example: 111
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
   *       Get post with id
   *     description:
   *       "Users only can see the public post detail and all their posts detail (except deleted posts). Notice: if you are a guest (not login), please not set Authorization in request header"
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
   *                      likes:
   *                         type: number
   *                         example: 1          
   *                      comments:
   *                         type: number
   *                         example: 1          
   *                      cover:
   *                         type: string
   *                         example:           
   *                      recommend:
   *                         type: boolean
   *                         example: false        
   *                      isLiked:
   *                         type: boolean
   *                         example: false        
   *                      isInBookmark:
   *                         type: boolean
   *                         example: false
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
 *                   tags:
 *                      type: array
 *                      items:
 *                       type: string
 *                       example: 
 *                   likes:
 *                      type: integer
 *                      example: 0
 *                   comments:
 *                      type: integer
 *                      example: 0
 *                   recommend:
 *                      type: boolean
 *                      example: false
 *                   id:
 *                      type: integer
 *                      example: 100
 *                   title:
 *                      type: string
 *                      example: title
 *                   description:
 *                      type: string
 *                      example: description
 *                   content:
 *                      type: string
 *                      example: content
 *                   status:
 *                      type: string
 *                      example: private
 *                   userId:
 *                      type: integer
 *                      example: 111
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
  * /posts/{id}/likes:
  *   get:
  *     tags:
  *       - Reaction
  *     produces:
  *       - application/json
  *     summary:
  *       Get list of users like post with id 
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: Numeric ID of the post to retrieve.
  *         schema:
  *           type: number
  *           example: 1
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               example: [{
  *                 id: 6,
  *                 userId: 1,
  *                 postId: 2,
  *                 user: {
  *                   id: 1,
  *                   email: quan.do@supremetech.vn,
  *                   firstName: do,
  *                   lastName: quan,
  *                   phone: 0909090900,
  *                   gender: male,
  *                   dob: 19/10/1995,
  *                   displayName: quanDo,
  *                   picture: null,
  *                   followers: 0,
  *                   followings: 1
  *                 }
  *               }]
 */
  .put(jwtCheck, postController.like)
/**
 * @swagger
 *
 * /posts/{id}/likes:
 *   put:
 *     tags:
 *       - Reaction
 *     produces:
 *       - application/json
 *     summary:
 *       Like a post with id, this post will add userId to likes attr 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the post to retrieve.
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { liked: true | false }          
 */
router
  .route('/:id/comments')

  .get(postController.getComments)
 /**
  * @swagger
  /**
  * @swagger
  *
  * /posts/{id}/comments:
  *   get:
  *     tags:
  *       - Reaction
  *     produces:
  *       - application/json
  *     summary:
  *       Get list of users commented post with id
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: Numeric ID of the post to retrieve.
  *         schema:
  *           type: number
  *           example: 1
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               example: [{
  *                 id: 2,
  *                 userId: 1,
  *                 postId: 1,
  *                 comment: This is comment,
  *                 user: {
  *                   id: 1,
  *                   email: quan.do@supremetech.vn,
  *                   firstName: do,
  *                   lastName: quan,
  *                   phone: 0909090900,
  *                   gender: male,
  *                   dob: 19/10/1995,
  *                   displayName: quanDo,
  *                   picture: null,
  *                   isActive: true,
  *                   isAdmin: false,
  *                   followers: 0,
  *                   followings: 1
  *                 }
  *               }]            
 */
  .post(jwtCheck, validate(postchema.addComment), postController.comment)
/**
* @swagger
*
* /posts/{id}/comments:
*   post:
*     tags:
*       - Reaction
*     produces:
*       - application/json
*     summary:
*       Comment a post with id, this post will add userId to comments attr
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the post to retrieve.
*         schema:
*           type: number
*           example: 1
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
*               example: {
*                 id: 1,
*                 userId: 1,
*                 postId: 1,
*                 comment: This is comment,
*                 updatedAt: 2021-07-05T10:59:03.534Z,
*                 createdAt: 2021-07-05T10:59:03.534Z
*               }
*/

export default router;
