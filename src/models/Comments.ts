import { Post } from './Post';
import { DataTypes, Model, Optional } from 'sequelize';
import { PostErrors } from '../lib/api-error';
import db from '../config/database';

interface CommentAttributes {
  id: number;
  userId: number;
  postId: number;
  comment: string;
}

// You can also set multiple attributes optional at once
interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> { }

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes, CommentCreationAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId!: number; // for nullable fields
  public postId!: number;
  public comment!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async commentPost(id: string, authInfo: any, content: any) {
    const currentPost = Comment.findAll({ where: { postId: id } });
    if (!currentPost) {
      throw PostErrors.NOT_FOUND;
    }

    const commentTemp = new Comment({ userId: authInfo.userId, postId: JSON.parse(id), comment: content.content });
    const newComment = await commentTemp.save();

    return { status: 200, message: 'Successfully', comments: newComment };
  }
}

Comment.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: { model: 'Posts', key: 'id' }
  },
  comment: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Comments' // We need to choose the model name
});
