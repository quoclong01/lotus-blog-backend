import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  status: string;
  userId: number;
}

// You can also set multiple attributes optional at once
interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes, PostCreationAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public content!: string | null; // for nullable fields
  public status!: string;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async createPost(data: any) {
    data.title = data.title.trim().replace(/\n+/g, ' ');
    data.content = data.content ? data.content.trim().replace(/(\n){3,}/g, '\n\n') : null;
    data.status = data.status ? data.status.trim().replace(/(\n){3,}/g, '\n\n') : null;
    data.createdAt = new Date();
    data.updateAt = new Date();
    const post = new Post(data);
    return await post.save();
  }

  public static async updateContent(id: string, data: any) {
    console.log(data.content);
    // find and update character
    const idPost = await Post.findOne({
      where: { id }
    });
    if (idPost) {
      return idPost.update({
        content: data.content
      });
    }
    else {
      return null;
    }
  }

  public static async removePost(id: string) {
    // find and delete character
    return Post.findOne({
      where: { id }
    }).then((post) => {
      return post? post.destroy(): null;
    });
  }
}

Post.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Post' // We need to choose the model name
});
