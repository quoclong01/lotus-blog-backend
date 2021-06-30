import express from 'express';
import followerController from '../../controllers/follower.controller';
import { validate } from '../../lib/utils';
import followerSchema from '../../schema/follower.schema';
import expressjwt from 'express-jwt';

const router = express.Router();
const jwtCheck = expressjwt({
  secret: 'RANDOM_TOKEN_SECRET',
  algorithms: ['HS256']
});

router
  .route('/followers')
  .get(jwtCheck, followerController.getFollowers)
  /**
   * @swagger
   * /friends/followers:
   *   get:
   *     summary: Get all followers by user
   *     tags:
   *       - Follower
   *     produces:
   *       - application/json
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               example: [{ id: 3, email: nhi.nguyen@supremetech.vn, firstName: nhi, lastName: nguyen, phone: '', gender: male, displayName: null, picture: null, dob: 04/01/1997 }]
  */
 
router
  .route('/followings')
  .get(jwtCheck, followerController.getFollowings)
  /**
   * @swagger
   * /friends/followings:
   *   get:
   *     summary: Get all followings by user
   *     tags:
   *       - Follower
   *     produces:
   *       - application/json
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               example: [{ id: 3, email: nhi.nguyen@supremetech.vn, firstName: nhi, lastName: nguyen, phone: '', gender: male, displayName: null, picture: null, dob: 19/10/1995}]
  */

router
  .route('/follow')
  .get(followerController.index)
  .post(jwtCheck, validate(followerSchema.addFollower), followerController.toggleFollower)
  /**
   * @swagger
   *
   * /friends/follow:
   *   post:
   *     tags:
   *       - Follower
   *     produces:
   *       - application/json
   *     summary: Add/Remove follow an user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             example: { followingId: 1 }
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               example: { followed: true|false }     
  */

export default router;
