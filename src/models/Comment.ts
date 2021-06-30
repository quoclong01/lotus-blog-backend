import { PostErrors } from './../lib/api-error';
import { Post } from './Post';
import { User } from './User';
import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/database';

interface CommentAttributes {
  id: number;
  userId: number;
  postId: number;
  comment: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> { }

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes, CommentCreationAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public comment!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async getComments(id: string) {
    const data = await Comment.findAll({
      where: {
        postId: id
      },
      include: { model: User, as: 'user', required: false },
      order: [['createdAt', 'DESC']]
    });
    return data;
  }

  public static async doComment(id: any, authInfo: any, content: any) {
    const currentPost = await Post.findOne({ where: { id: id } });
    if (!currentPost) throw PostErrors.NOT_FOUND;

    const commentTemp = new Comment({ userId: authInfo.userId, postId: id, comment: content.content });
    await commentTemp.save();
    await currentPost.update({comments: ++currentPost.comments})
    return 'Commented successfully'
  }
  
}

Comment.init({
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
  comment: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db.sequelize,
  tableName: 'Comments'
});
