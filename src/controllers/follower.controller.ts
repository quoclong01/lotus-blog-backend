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
      attributes: [],
      where: { followingId: id },
      include: [{
        model: User,
        as: 'followerInfo',
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'gender', 'dob', 'displayName', 'picture']
      }]
    });

    return data.map((x: any) => x.followerInfo);
  }),
  getFollowings: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const authInfo: any = req.user;

    const id = req.params.id === 'me' ?  authInfo.userId : req.params.id;

    const data = await Follower.findAll({
      attributes: [],
      where: { followerId: id },
      include: [{
        model: User,
        as: 'followingInfo',
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'gender', 'dob', 'displayName', 'picture']
      }]
    });

    return data.map((x: any) => x.followingInfo);
  }),
  toggleFollower: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const authInfo: any = req.user;
    const { followingId } = req.body;
    if (authInfo.userId === followingId) throw FollowerErrors.INTERACT_PERMISSION;

    const userFollowingsTemp = await User.findByPk(followingId);
    const userFollowersTemp = await User.findByPk(authInfo.userId);


    if (!userFollowingsTemp || !userFollowersTemp) throw FollowerErrors.NOT_FOUND;

    const followersCount = userFollowingsTemp.followings;
    const followingsCount = userFollowersTemp.followers;
    const followerTemp = await Follower.findOne({
      where: { followerId: authInfo.userId, followingId }
    });

    if (followerTemp) {
      await userFollowingsTemp.update({followers: followersCount - 1});
      await userFollowersTemp.update({followings: followingsCount - 1});
      await followerTemp.destroy();

      return { followed: false };
    }

    const followerData = new Follower({
      followingId,
      followerId: authInfo.userId
    });
    await userFollowingsTemp.update({followers: followersCount + 1});
    await userFollowersTemp.update({followings: followingsCount + 1});
    await followerData.save();

    return  { followed: true };
  })
};

export default followerController;
