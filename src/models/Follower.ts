import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';
import { FollowerErrors } from '../lib/api-error';
import { User } from './User';

interface FollowerAttributes {
  id: number;
  userId: number;
  followerId: number;
}

interface FollowerCreationAttributes extends Optional<FollowerAttributes, 'id'> {}

export class Follower extends Model<FollowerAttributes, FollowerCreationAttributes> implements FollowerAttributes, FollowerCreationAttributes {
  public id!: number;
  public followerId!: number;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async createFollower(data: any, authInfo: any) {
    if (authInfo.userId !== data.followerId) {
      const userTemp = await User.findOne({
        where: { id: data.followerId }
      });
      if (userTemp) {
        const followerTemp = await Follower.findOne({
          where: { userId: authInfo.userId, followerId: data.followerId }
        });
        if (!followerTemp) {
          const followerData = new Follower({
            followerId: data.followerId,
            userId: authInfo.userId
          });
  
          const follower = await followerData.save();
          return 'Follow successfully.';
        }
        return FollowerErrors.ALREADY_FOLLOWER_EXISTED;
      }
      throw FollowerErrors.NOT_FOUND;
    }
    throw FollowerErrors.INTERACT_PERMISSION;
  }

  public static async deleteFollower(data: any, authInfo: any) {
    if (authInfo.userId !== data.followerId) {
      const followerTemp = await Follower.findOne({
        where: { userId: authInfo.userId, followerId: data.followerId }
      });
      if (followerTemp) {
        await followerTemp.destroy();
        return 'Unfolowing successfully.';
      }
      throw FollowerErrors.NOT_FOUND;
    }
    throw FollowerErrors.INTERACT_PERMISSION;
  }
}

Follower.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
  followerId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Followers' // We need to choose the model name
});
