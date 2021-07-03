import { DataTypes, Model, Optional, Op, where, fn, col } from 'sequelize';
import { PostErrors } from '../lib/api-error';
import db from '../config/database';
import { DEFAULT_SIZE } from '../lib/constant';
import { QueryBuilder } from '../lib/constructors';
import { literal } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { PostStatus } from '../lib/enum';
import { User } from './User'


interface PostAttributes {
  id: number;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: string[];
  userId: number;
  likes: number;
  comments: number;
  cover: string;
  recommend: boolean;
  deletedAt: Date;
}

class RequestPost {
  title?: string;
  description?: string;
  content?: string;
  status?: string;
  tags?: string[];

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
    if (data.tags) {
      this.tags = data.tags;
    }
  }
}

class PostQueryBuilder extends QueryBuilder {
  where: any = {};
  include = { model: User, as: 'user', required: false };

  constructor(baseQuery: any, tags: string[] = [], recommend: any = null) {
    super(baseQuery);
    const whereAnd: any = [
      { status: PostStatus.PUBLIC },
    ]
    if (tags.length > 0) {
      whereAnd.push(
        {
          [Op.or]: tags.map(x => where(literal(`'${x}'`), fn('ANY', col('tags')))),
        }
      );
    }
    if (recommend) {
      whereAnd.push(
        {
          recommend: recommend
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
  public likes!: number;
  public comments!: number;
  public cover!: string;
  public recommend!: boolean;
  public deletedAt!: Date;

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
    const data = await Post.findAll({ ...queryStatement });
    const length = +await Post.count(queryStatement);
    const totalPage = Math.ceil(length / size);

    return {
      data,
      totalPage,
      totalItems: length,
      itemsPerPage: size,
      currentPage: +query.page || 1,
      loadMore: offset < totalPage - 1
    };
  }

  public static async listAuthPosts(query: any, authInfo: any) {
    const size = +query.size || DEFAULT_SIZE;
    const offset = (+query.page - 1) * size || 0;
    const tags = query.tags ? query.tags.split(',') : [];
    if (tags.length > 0) {
      return this.listPosts(query);
    } else {
      const baseQuery = `WITH
      followers_posts_in_week as (
          select p.*, 
          case when b."userId" is not null 
              then TRUE 
              else FALSE
          end as "isInBookmark"
          from
              "Posts" p LEFT JOIN "Bookmarks" b ON  b."userId" = :userId AND b."postId" = p.id
                      INNER JOIN "Followers" f on p."userId" = f."followerId"
          WHERE p."updatedAt" >= current_date - interval '7 days' AND p."status" = 'public'
          ORDER BY
              p."updatedAt" desc
      ), other_posts as (
          (
              select p.*, 
              case when b."userId" is not null 
                  then TRUE 
                  else FALSE
              end as "isInBookmark"
              from
                  "Posts" p LEFT JOIN "Bookmarks" b ON  b."userId" = :userId AND b."postId" = p.id
                            LEFT JOIN "followers_posts_in_week" w on w.id = p.id
              WHERE w.id is null AND p."status" = 'public'
              ORDER BY
                  p."updatedAt" desc
          )
      )`;
      const data = await this.sequelize.query(`
        ${baseQuery}
        select * from ((SELECT * from followers_posts_in_week LIMIT 10)
        union all
        (SELECT * FROM other_posts)) as temp limit :limit offset :offset;`,
      {
        replacements: { userId: authInfo.userId, limit: size, offset },
        type: QueryTypes.SELECT
      });

      const lengthRaw: any = await this.sequelize.query(`
        ${baseQuery}
        select COUNT(*) from ((SELECT * from followers_posts_in_week LIMIT 10)
        union all
        (SELECT * FROM other_posts)) as temp1`,
      {
        replacements: { userId: authInfo.userId },
        type: QueryTypes.SELECT
      });
      const length = +lengthRaw[0].count;
      const totalPage = Math.ceil(length / size);
  
      return {
        data, 
        totalPage,
        totalItems: length,
        itemsPerPage: size,
        currentPage: +query.page || 1,
        loadMore: offset < totalPage - 1
      };
    }
  }
  public static async listRecommendPosts(query: any) {
    const size = +query.size || DEFAULT_SIZE;
    const offset = (+query.page - 1) * size || 0;
    const queryStatement = new PostQueryBuilder({
      limit: size,
      offset,
      order: [['createdAt', 'DESC']]
    }, [], true).getPlainObject();
    const data = await Post.findAll({ ...queryStatement });
    
    const length = +await Post.count({ ...queryStatement });
    const totalPage = Math.ceil(length / size);
    return {
      data,
      totalPage,
      totalItems: length,
      itemsPerPage: size,
      currentPage: +query.page || 1,
      loadMore: offset < totalPage - 1
    };
  }
  public static async listDeletedPosts(query:any, authInfo: any) {
    const size = +query.size || DEFAULT_SIZE;
    const offset = (+query.page - 1) * size || 0;

    const data = await Post.findAll({
      where: { userId: authInfo.userId, deletedAt: { [Op.ne]: null } },
      paranoid:false,
      order: [['createdAt', 'DESC']]
    })

    const length = +await Post.count({
      where: { userId: authInfo.userId, deletedAt: { [Op.ne]: null } },
      paranoid:false,
    });

    const totalPage = Math.ceil(length / size);
    return {
      data,
      totalPage,
      totalItems: length,
      itemsPerPage: size,
      currentPage: +query.page || 1,
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

  public static async getlistDrafts(authInfo: any) {

    const dataPost = await Post.findAll({
      where: {
        userId: authInfo.userId,
        status: PostStatus.DRAFT
      }
    })

    return dataPost;
  }

  public static async createDraft(data: any, authInfo: any) {
    const defaultValue = {
      title: '',
      description: '',
      content: '',
    }
    const postData: any = new RequestPost({
      ...data,
      status: PostStatus.DRAFT
    });
    const dataPost = new Post({
      ...defaultValue,
      ...postData,
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
      ...dataTemp
    });
    return currentPost;
  }

  public static async getPost(id: string) {
    const currentPost = await Post.findOne({
      where: { id: id, status: PostStatus.PUBLIC },
      include: { model: User, as: 'user', required: false }
    });

    if (!currentPost) throw PostErrors.NOT_FOUND; 
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
}

Post.init({
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
  },
  content: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('private', 'public', 'draft'),
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
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cover: {
    type: DataTypes.STRING,
  },
  recommend: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  // Other model options go here
  paranoid: true,
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Posts' // We need to choose the model name
});
