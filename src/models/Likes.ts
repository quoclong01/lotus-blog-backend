import { Post } from './Post';
import { DataTypes, Model, Optional } from 'sequelize';
import { PostErrors } from '../lib/api-error';
import db from '../config/database';

interface LikesAttributes {
  id: number;
  userId: Array<number>;
  postId: number;
}

// You can also set multiple attributes optional at once
interface LikesCreationAttributes extends Optional<LikesAttributes, 'id'> { }

export class Likes extends Model<LikesAttributes, LikesCreationAttributes> implements LikesAttributes, LikesCreationAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId!: Array<number>; // for nullable fields
  public postId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async getLikes(id: string, authInfo: any) {
    const currentPost = await Likes.findOne({
      where: { postId: id },
    })

    if (!currentPost) {
      const data = new Likes({ userId: [authInfo.userId], postId: JSON.parse(id) });
      console.log(data);
      const like = await data.save();
    }

    const likes = [...currentPost.userId];
    if (likes.indexOf(authInfo.userId) !== -1) {
      likes.splice(likes.indexOf(authInfo.userId), 1);
    } else { likes.push(authInfo.userId); }

    await currentPost.update({
      userId: likes
    })

    return { status: 200, message: 'Successfully' };
  }
}

Likes.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  postId: {
    type: DataTypes.INTEGER,
    references: { model: 'Posts', key: 'id' }
  },
}, {
  // Other model options go here
  paranoid: true,
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Likes' // We need to choose the model name
});
