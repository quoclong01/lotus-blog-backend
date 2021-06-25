import { DataTypes, Model, Optional, Op, where, fn, col } from 'sequelize';
import { PostErrors } from '../lib/api-error';
import db from '../config/database';
import { DEFAULT_SIZE } from '../lib/constant';
import { QueryBuilder } from '../lib/constructors';
import { literal } from 'sequelize';

interface PostAttributes {
  id: number;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: string[];
  userId: number;
}

class RequestPost {
  title?: string;
  description?: string;
  content?: string;
  status?: string;

  constructor(data: any) {
    if (data.title) {
      this.title = data.title.trim().replace(/\n+/g, ' ');
    }
    if (data.description) {
      this.description = data.description.trim().replace(/(\n){3,}/g, '\n\n');
    }
    if (data.content) {
      this.content = data.content.trim().replace(/(\n){3,}/g, '\n\n');
    }
    if (data.status) {
      this.status = data.status;
    }
  }
}

class PostQueryBuilder extends QueryBuilder {
  where: any = {};
  constructor(baseQuery: any, tags: string[]) {
    super(baseQuery);
    const whereAnd: any = [
      { status: 'public' },
    ]
    if (tags.length > 0) {
      whereAnd.push(
        {
          [Op.or]: tags.map(x => where(literal(`'${x}'`), fn('ANY', col('tags')))),
        }
      );
    }
    this.where = {
      [Op.and]: whereAnd
    }
  }
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> { }

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes, PostCreationAttributes {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public content!: string | null;
  public status!: string;
  public userId!: number;
  public tags!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async listPosts(query: any) {
    const size = +query.size || DEFAULT_SIZE;
    const offset = (+query.page - 1) * size || 0;
    const tags = query.tags ? query.tags.split(',') : [];
    const queryStatement = new PostQueryBuilder({
        limit: size,
        offset,
        order: [['createdAt', 'DESC']]
      }, tags).getPlainObject();

    const data = await Post.findAll(queryStatement);
    const length = +await Post.count(queryStatement);
    const totalPage = Math.ceil(length / size);

    return { 
      data, 
      totalPage,
      totalItems: length,
      itemsPerPage: size,
      currentPage: +query.page,
      loadMore: offset < totalPage - 1
    };
  }

  public static async createPost(data: any, authInfo: any) {
    const dataTemp: any = new RequestPost(data);
    const dataPost = new Post({
      ...dataTemp,
      userId: authInfo.userId
    });
    const post = await dataPost.save();
    return post;
  }

  public static async updateContent(id: string, data: any, authInfo: any) {
    const currentPost = await Post.findByPk(id);

    if (!currentPost) 
      throw PostErrors.NOT_FOUND;
    if (authInfo.userId !== currentPost.userId)
      throw PostErrors.INTERACT_PERMISSION;

    const dataTemp: any = new RequestPost(data);
    await currentPost.update({
      ...currentPost,
      dataTemp
    });
    return currentPost;
  }

  public static async removePost(id: string, authInfo: any) {
    // find and delete character
    const currentPost = await Post.findByPk(id);

    if (!currentPost) throw PostErrors.NOT_FOUND;

    if (authInfo.userId !== currentPost.userId)
      throw PostErrors.INTERACT_PERMISSION;

    currentPost.destroy();
    return 'Delete post successfully';
  }

  public static async restorePost(id: string, authInfo: any) {
    const currentPost = await Post.findOne({
      where: { id },
      paranoid: false
    })

    if (!currentPost) throw PostErrors.NOT_FOUND;

    if (authInfo.userId !== currentPost.userId)
      throw PostErrors.INTERACT_PERMISSION;

    currentPost.restore();
    return 'Restore post successfully';
  }

  public static async likePost(id: string) {
    return { status: 200, message: 'Comming soon' }
  }

  public static async commentPost(id: string) {
    return { status: 200, message: 'Comming soon' };
  }

  public static async getLikes(id: string) {
    return { status: 200, message: 'Comming soon' };
  }

  public static async getComments(id: string) {
    return { status: 200, message: 'Comming soon' };
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
  description: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  content: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
}, {
  // Other model options go here
  paranoid: true,
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Posts' // We need to choose the model name
});
