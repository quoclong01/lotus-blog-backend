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
  .route('/')
  .get(followerController.index)
  .post(jwtCheck, validate(followerSchema.addFollower), followerController.create)
  /**
   * @swagger
   *
   * /followers:
   *   post:
   *     tags:
   *       - Follower
   *     produces:
   *       - application/json
   *     summary: Add following user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             example: { followerId: 1 }
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  message:
   *                    type: string
   *                    example: Following successfully.     
  */
  .delete(jwtCheck, validate(followerSchema.addFollower), followerController.delete)
  /**
   * @swagger
   *
   * /followers:
   *   delete:
   *     tags:
   *       - Follower
   *     produces:
   *       - application/json
   *     summary: Add following user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             example: { followerId: 1 }
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  message:
   *                    type: string
   *                    example: Unfollowing successfully.     
  */

export default router;
