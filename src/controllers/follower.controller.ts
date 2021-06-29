import { Request, Response, NextFunction } from 'express';
import { User, Follower } from '../models';
import { responseMiddleware } from '../lib/utils';
import { UserErrors, FollowerErrors } from '../lib/api-error';

const followerController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await { status: 200, message: 'Comming soon' };
  }),
  getFollowers: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const authInfo: any = req.user;
    const id = req.params.id === 'me' ?  authInfo.userId : req.params.id;

    const data = await Follower.findAll({
      attributes: ['followerId', 'followingId'],
      where: { followingId: id },
      include: [{
        model: User,
        as: 'followingInfo',
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'gender', 'dob', 'displayName', 'picture']
      }]
    });

    if (!data) throw UserErrors.NOT_FOUND;

    return { users: data };
  }),
  getFollowings: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const authInfo: any = req.user;

    const id = req.params.id === 'me' ?  authInfo.userId : req.params.id;

    const data = await Follower.findAll({
      attributes: ['followerId', 'followingId'],
      where: { followerId: id },
      include: [{
        model: User,
        as: 'followerInfo',
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'gender', 'dob', 'displayName', 'picture']
      }]
    });

    if (!data) throw UserErrors.NOT_FOUND;

    return { users: data };
  }),
  toggleFollower: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const authInfo: any = req.user;
    const { followingId } = req.body;
    if (authInfo.userId === followingId) throw FollowerErrors.INTERACT_PERMISSION;

    const userTemp = await User.findByPk(followingId);

    if (!userTemp) throw FollowerErrors.NOT_FOUND;

    const followerTemp = await Follower.findOne({
      where: { followerId: authInfo.userId, followingId }
    });

    if (followerTemp) {
      await followerTemp.destroy();
      return { followed: false };
    }

    const followerData = new Follower({
      followingId,
      followerId: authInfo.userId
    });
    await followerData.save();
    return  { followed: true };
  })
};

export default followerController;
