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
  .post(validate(followerSchema.addFollower), followerController.create)
