import { DataTypes, Model, Optional, Op, where, fn, col } from 'sequelize';
import { PostErrors } from '../lib/api-error';
import db from '../config/database';
import { DEFAULT_LANG, DEFAULT_SIZE } from '../lib/constant';
import { QueryBuilder } from '../lib/constructors';
import { literal } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { PostStatus } from '../lib/enum';
import { User, Like, Bookmark } from '../models';
const translate = require('translate-google')

interface PostAttributes {
  id: number;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: string;
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
  tags?: string;
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
    const whereAnd: any = isPublic ? [{ status: PostStatus.PUBLIC }] : [];
    if (tags.length > 0) {
      whereAnd.push({
        tags: {
          [Op.like]: `%${tags}%`
        }
      });
    }
    if (Object.keys(additionParams).length > 0) {
      whereAnd.push(additionParams);
    }
    this.where = {
      [Op.and]: whereAnd
    };
  }
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes, PostCreationAttributes
{
  public id!: number;
  public title!: string;
  public description!: string | null;
  public content!: string | null;
  public status!: string;
  public userId!: number;
  public tags!: string;
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
    const tags = query.tags;
    
    const queryStatement = new PostQueryBuilder(
      {
        limit: size,
        offset,
        order: [['createdAt', 'DESC']]
      },
      tags
    ).getPlainObject();
    const data = await Post.findAll({ ...queryStatement });
    const length = +(await Post.count(queryStatement));
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
      const baseQuery = `
        WITH followers_posts_in_week as (
          select p.*,
          case when b.userId is not null 
            then TRUE 
            else FALSE
          end as isInBookmark,
          case when l.userId is not null 
            then TRUE 
            else FALSE
          end as isLiked
          from
            Posts as p LEFT JOIN Bookmarks as b ON  b.userId = :userId AND b.postId = p.id
                LEFT JOIN Likes as l ON  l.userId = :userId AND l.postId = p.id
                INNER JOIN Followers as f on p.userId = f.followerId AND f.followingId = :userId
          WHERE p.updatedAt >= DATE_ADD(NOW(), INTERVAL 7 DAY) AND p.status = 'public' AND p.userId <> :userId AND p.deletedAt is null
          ORDER BY p.updatedAt desc
      ),
        other_posts as (
          select p.*,
          case when b.userId is not null 
              then TRUE 
              else FALSE
          end as isInBookmark,
          case when l.userId is not null 
              then TRUE 
              else FALSE
          end as isLiked
          from
              Posts as p LEFT JOIN Bookmarks as b ON  b.userId = :userId AND b.postId = p.id
                        LEFT JOIN Likes as l ON  l.userId = :userId AND l.postId = p.id
                        LEFT JOIN followers_posts_in_week as w on w.id = p.id
          WHERE w.id is null AND p.status = 'public' AND p.userId <> :userId AND p.deletedAt is null
          ORDER BY p.updatedAt desc
        )`;
      const data = await this.sequelize.query(
        `
        ${baseQuery}
        select temp.*, (json_object('id', u.id, 'email', u.email, 'firstName', u.firstName, 'lastname', u.lastName, 'displayName', 
        u.displayName, 'gender', u.gender, 'picture', u.picture)) as user
        from ((SELECT * from followers_posts_in_week)
        union all
        (SELECT * FROM other_posts)) as temp LEFT JOIN Users u ON temp.userId = u.id limit :limit offset :offset;`,
        {
          replacements: { userId: authInfo.userId, limit: size, offset },
          type: QueryTypes.SELECT,
          nest: true
        }
      );

      const lengthRaw: any = await this.sequelize.query(
        `
        ${baseQuery}
        select COUNT(*) as count from ((SELECT * from followers_posts_in_week LIMIT 10)
        union all
        (SELECT * FROM other_posts)) as temp1`,
        {
          replacements: { userId: authInfo.userId },
          type: QueryTypes.SELECT
        }
      );
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
    const data = await Post.findAll({
      where: { status: PostStatus.PUBLIC },
      attributes: [
        'id', 'title', 'content', 'description',
        'status', 'tags', 'userId', 'likes', 'comments',
        'cover', 'createdAt'
      ],
      order: literal('COALESCE(likes, 0) + COALESCE(comments, 0) DESC'),
      limit: size,
      offset,
      include: {
        model: User, as: 'user', required: false,
        attributes: [
          'email', 'firstName', 'lastName',
          'phone', 'gender', 'displayName',
          'picture', 'dob'
        ]
      }
    });
    const length = +await Post.count({where: {status: PostStatus.PUBLIC}});

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
  public static async listDeletedPosts(query: any, authInfo: any) {
    const size = +query.size || DEFAULT_SIZE;
    const offset = (+query.page - 1) * size || 0;
    const queryStatement = new PostQueryBuilder(
      {
        limit: size,
        offset,
        order: [['createdAt', 'DESC']]
      },
      [],
      {
        userId: authInfo.userId,
        deletedAt: { [Op.ne]: null }
      },
      false
    ).getPlainObject();

    const data = await Post.findAll({
      ...queryStatement,
      paranoid: false
    });

    const length = +(await Post.count({
      ...queryStatement,
      paranoid: false
    }));

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
    });

    return dataPost;
  }

  public static async createDraft(data: any, authInfo: any) {
    const defaultValue = {
      title: '',
      description: '',
      content: ''
    };
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

    if (!currentPost) throw PostErrors.NOT_FOUND;
    if (authInfo.userId !== currentPost.userId) throw PostErrors.INTERACT_PERMISSION;

    const dataTemp: any = new RequestPost(data);
    await currentPost.update({
      ...dataTemp
    });
    return currentPost;
  }

  public static async getPost(id: string, query: any, authInfo: any) {
    const lang: string = query.lang || '';
    let currentPost: any;
    if (!authInfo) {
      currentPost = await Post.findOne({
        where: { id: id, status: PostStatus.PUBLIC },
        include: { model: User, as: 'user', required: false },
      });
    } else {
      const result = await Post.findByPk(id, {
        attributes: {
          include: [
            [literal('CASE WHEN likeInfo.id is not null THEN TRUE ELSE FALSE END'), 'isLiked'],
            [literal('CASE WHEN bookmarks.id is not null THEN TRUE ELSE FALSE END'), 'isInBookmark']
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
        ],
      });
      if (result.status === PostStatus.PUBLIC || result.userId === authInfo.userId) {
        currentPost = result;
      }
    }
    const dataTranslation = {
      title: currentPost.title,
      content: currentPost.content,
      description: currentPost.description
    }
    if (lang) {
      await translate(dataTranslation, { to: lang }).then((res: any) => {
        currentPost.dataValues.title = res.title;
        currentPost.dataValues.content = res.content;
        currentPost.dataValues.description = res.description;
      }).catch((err: any) => {
        console.log(err);
      });
    }

    if (!currentPost) throw PostErrors.NOT_FOUND;
    return currentPost;
  }

  public static async removePost(id: string, authInfo: any) {
    // find and delete character
    const currentPost = await Post.findByPk(id);

    if (!currentPost) throw PostErrors.NOT_FOUND;

    if (authInfo.userId !== currentPost.userId) throw PostErrors.INTERACT_PERMISSION;

    currentPost.destroy();
    return 'Delete post successfully';
  }

  public static async restorePost(id: string, authInfo: any) {
    const currentPost = await Post.findOne({
      where: { id },
      paranoid: false
    });

    if (!currentPost) throw PostErrors.NOT_FOUND;

    if (authInfo.userId !== currentPost.userId) throw PostErrors.INTERACT_PERMISSION;

    currentPost.restore();
    return 'Restore post successfully';
  }

  public static async getTags(query: any) {
    const size = +query.size || DEFAULT_SIZE;
    const data = await this.sequelize.query(
      `SELECT DISTINCT tags FROM posts`,
      {
        type: QueryTypes.SELECT,
        nest: true
      }
    );
    const listTags: string[] = [].concat.apply([], data.map((item: any) => item.tags.split(',')));
    const newData: string[] =  [...new Set(listTags)].filter((item: string) => item).slice(0, size);
    return { data: newData };
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
      type: DataTypes.STRING,
      defaultValue: '',
      get() {
        return this.getDataValue('tags').split(',');
      },
      set(val: string[]) {
        this.setDataValue('tags', val.join(','));
      }
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
      type: DataTypes.STRING
    },
    recommend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null
    }
  },
  {
    // Other model options go here
    paranoid: true,
    sequelize: db.sequelize, // We need to pass the connection instance
    tableName: 'Posts' // We need to choose the model name
  }
);
