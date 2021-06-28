import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';
import { FollowerErrors } from '../lib/api-error';
import { User } from './User';

interface FollowerAttributes {
  id: number;
  followerId: number;
  followingId: number;
}

interface FollowerCreationAttributes extends Optional<FollowerAttributes, 'id'> { }

export class Follower extends Model<FollowerAttributes, FollowerCreationAttributes> implements FollowerAttributes, FollowerCreationAttributes {
  public id!: number;
  public followerId!: number;
  public followingId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
}

Follower.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  followerId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
  followingId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Followers' // We need to choose the model name
});
