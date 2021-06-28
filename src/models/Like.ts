import { Post } from './Post';
import { DataTypes, Model, Optional } from 'sequelize';
import { PostErrors } from '../lib/api-error';
import db from '../config/database';

interface LikeAttributes {
  id: number;
  userId: Array<number>;
  postId: number;
}

// You can also set multiple attributes optional at once
interface LikeCreationAttributes extends Optional<LikeAttributes, 'id'> { }

export class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes, LikeCreationAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId!: Array<number>; // for nullable fields
  public postId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async doLike(id: string, authInfo: any) {
    const currentPost = await Post.findOne({
      where: { id },
    })

    if (!currentPost)
      throw PostErrors.NOT_FOUND;

    const currentLike = await Like.findOne({
      where: { postId: id },
    })

    if (!currentLike) {
      const data = new Like({ userId: [authInfo.userId], postId: JSON.parse(id) });
      console.log(data);
      const like = await data.save();
      return 'Liked successfully!'
    }
    else {
      const likes = [...currentLike.userId];
      if (likes.indexOf(authInfo.userId) !== -1) {
        likes.splice(likes.indexOf(authInfo.userId), 1);
      } else { likes.push(authInfo.userId); }

      await currentLike.update({
        userId: likes
      })

      return 'Liked successfully!'
    }
  }
}

Like.init({
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
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Likes' // We need to choose the model name
});
