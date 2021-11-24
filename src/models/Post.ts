import { DataTypes, Model, Optional, Op, where, fn, col } from 'sequelize';
import { PostErrors } from '../lib/api-error';
import db from '../config/database';
import { DEFAULT_SIZE } from '../lib/constant';
import { QueryBuilder } from '../lib/constructors';
import { literal } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { PostStatus } from '../lib/enum';
import { User, Like, Bookmark } from '../models';


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
  cover?: string;

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
    if (data.cover) {
      this.cover = data.cover;
    }
  }
}

class PostQueryBuilder extends QueryBuilder {
  where: any = {};
  include = { model: User, as: 'user', required: false };

  constructor(baseQuery: any, tags: string[] = [], additionParams: any = {}, isPublic: boolean = true) {
    super(baseQuery);
    const whereAnd: any = isPublic ? [
      { status: PostStatus.PUBLIC },
    ] : [];
    if (tags.length > 0) {
      whereAnd.push(
        {
          [Op.or]: tags.map(x => where(literal(`'${x}'`), fn('ANY', col('tags')))),
        }
      );
    }
    if (Object.keys(additionParams).length > 0) {
      whereAnd.push(additionParams);
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
      loadMore: offset < length
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
          end as "isInBookmark",
          case when l."userId" is not null 
              then TRUE 
              else FALSE
          end as "isLiked"
          from
              "Posts" p LEFT JOIN "Bookmarks" b ON  b."userId" = :userId AND b."postId" = p.id
                      LEFT JOIN "Likes" l ON  l."userId" = :userId AND l."postId" = p.id
                      INNER JOIN "Followers" f on p."userId" = f."followerId" AND f."followingId" = :userId
          WHERE p."updatedAt" >= current_date - interval '7 days' AND p."status" = 'public' AND p."userId" <> :userId AND p."deletedAt" is null
          ORDER BY
              p."updatedAt" desc
      ), other_posts as (
          (
              select p.*,
              case when b."userId" is not null 
                  then TRUE 
                  else FALSE
              end as "isInBookmark",
              case when l."userId" is not null 
                  then TRUE 
                  else FALSE
              end as "isLiked"
              from
                  "Posts" p LEFT JOIN "Bookmarks" b ON  b."userId" = :userId AND b."postId" = p.id
                            LEFT JOIN "Likes" l ON  l."userId" = :userId AND l."postId" = p.id
                            LEFT JOIN "followers_posts_in_week" w on w.id = p.id
              WHERE w.id is null AND p."status" = 'public' AND p."userId" <> :userId AND p."deletedAt" is null
              ORDER BY
                  p."updatedAt" desc
          )
      )`;
      const data = await this.sequelize.query(`
        ${baseQuery}
        select temp.*, 
          u.id as "user.id", 
          u."email" as "user.email", 
          u."firstName" as "user.firstName", 
          u."lastName" as "user.lastName",
          u."displayName" as "user.displayName",
          u."gender" as "user.gender",
          u."picture" as "user.picture"
        from ((SELECT * from followers_posts_in_week)
        union all
        (SELECT * FROM other_posts)) as temp LEFT JOIN "Users" u ON temp."userId" = u.id limit :limit offset :offset;`,
      {
        replacements: { userId: authInfo.userId, limit: size, offset },
        type: QueryTypes.SELECT,
        nest: true,
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
        loadMore: offset < length
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
    }, [], { recommend: true }).getPlainObject();
    const data = await Post.findAll({ ...queryStatement });
    
    const length = +await Post.count({ ...queryStatement });
    const totalPage = Math.ceil(length / size);
    return {
      data,
      totalPage,
      totalItems: length,
      itemsPerPage: size,
      currentPage: +query.page || 1,
      loadMore: offset < length
    };
  }
  public static async listDeletedPosts(query:any, authInfo: any) {
    const size = +query.size || DEFAULT_SIZE;
    const offset = (+query.page - 1) * size || 0;
    const queryStatement = new PostQueryBuilder({
      limit: size,
      offset,
      order: [['createdAt', 'DESC']]
    }, [], {
      userId: authInfo.userId,
      deletedAt: { [Op.ne]: null }
    }, false).getPlainObject();

    const data = await Post.findAll({
      ...queryStatement,
      paranoid: false,
    })

    const length = +await Post.count({
      ...queryStatement,
      paranoid: false,
    });

    const totalPage = Math.ceil(length / size);
    return {
      data,
      totalPage,
      totalItems: length,
      itemsPerPage: size,
      currentPage: +query.page || 1,
      loadMore: offset < length
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

  public static async getPost(id: string, authInfo: any) {
    let currentPost;
    if (!authInfo) {
      currentPost = await Post.findOne({
        where: { id: id, status: PostStatus.PUBLIC },
        include: { model: User, as: 'user', required: false }
      });
    } else {
      const result = await Post.findByPk(id, {
        attributes: {
          include: [
            [literal('CASE WHEN "likeInfo"."id" is not null THEN TRUE ELSE FALSE END'), 'isLiked'],
            [literal('CASE WHEN "bookmarks"."id" is not null THEN TRUE ELSE FALSE END'), 'isInBookmark']
          ]
        },
        include: [
          { model: User, as: 'user', required: false },
          {
            model: Like, 
            attributes: [],
            as: 'likeInfo',
            required: false,
            where: {
              userId: authInfo.userId,
              postId: id
            }
          },
          {
            model: Bookmark, 
            attributes: [],
            as: 'bookmarks',
            required: false,
            where: {
              userId: authInfo.userId,
              postId: id
            }
          }
        ]
      });
      if (result.status === PostStatus.PUBLIC || result.userId === authInfo.userId) {
        currentPost = result;
      }
    }

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
