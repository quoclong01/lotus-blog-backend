import { PostErrors } from './../lib/api-error';
import { Post } from './Post';
import { User } from './User';
import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/database';

interface LikeAttributes {
  id: number;
  userId: number;
  postId: number;
}

interface LikeCreationAttributes extends Optional<LikeAttributes, 'id'> { }

export class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes, LikeCreationAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async getLikes(id: string) {
    const data = await Like.findAll({
      where: {
        postId: id
      },
      include: { model: User, as: 'user', required: false },
      order: [['createdAt', 'DESC']]
    });
    return data;
  }
  public static async toggleLike(id: any, authInfo: any) {
    const currentUser: any = authInfo.userId;
    const postId = id;
    const checkPost = await Post.findByPk(postId);

    if (!checkPost) throw PostErrors.NOT_FOUND;

    const currentLike = await Like.findOne({
      where: {
        postId,
      }
    });

    if (!currentLike) {
      const newBookmark = new Like({
        userId: currentUser,
        postId: postId
      });
      newBookmark.save();
      await checkPost.update({likes: ++checkPost.likes})
      return { isAdded: true }
    } else {
      currentLike.destroy();
      await checkPost.update({likes: --checkPost.likes})
      return { isRemoved: true }
    }
  }
}

Like.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
  postId: {
    type: DataTypes.INTEGER,
    references: { model: 'Posts', key: 'id' }
  },
}, {
  sequelize: db.sequelize,
  tableName: 'Likes'
});
