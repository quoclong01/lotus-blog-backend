import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';

interface FollowerAttributes {
  id: number;
  userId: number;
  followerId: number;
  status: string;
}

interface FollowerCreationAttributes extends Optional<FollowerAttributes, 'id'> {}

export class Follower extends Model<FollowerAttributes, FollowerCreationAttributes> implements FollowerAttributes, FollowerCreationAttributes {
  public id!: number;
  public followerId!: number;
  public userId!: number;
  public status!: string;

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
  status: {
    type: DataTypes.ENUM('follow', 'unfollow', 'block', 'normal'),
    allowNull: false,
    defaultValue: 'normal'
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
