import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { responseMiddleware } from '../lib/utils';

const defaultSize = 10;

const postController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    // get total record
    const length = await Post.count({ where: { status: 'public' } });
    // default limit 10 records
    const size = +req.query.size || defaultSize;
    const page = +req.query.page;
    const offset = page ? (page - 1) * size : 0;
    const totalPages = Math.ceil(length / size);
    // get n record from offset
    const data = await Post.findAll({
      limit: size,
      where: { status: 'public' },
      offset,
      order: [['createdAt', 'DESC']]
    });
    /**
     * Validate for load more
     * if loaded records less than total records, turn on load more
     * loaded records calculate from the offset combined with items per page
     */
    const status = (offset + size) < length;
    return { posts: data, totalPage: totalPages, currentPage: page, loadMore: status };
  }),
  new: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.createPost(req.body, req.user);
  }),
  show: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.findOne({
      where: { id: req.params.id }
    });
  }),
  updateContent: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.updateContent(req.params.id, req.body, req.user);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.removePost(req.params.id, req.user);
  }),
  restore: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.restorePost(req.params.id, req.user);
  }),
  like: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.likePost(req.params.id);
  }),
  getlikes: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.getLikes(req.params.id);
  }),
  getcomments: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.getComments(req.params.id);
  }),
  comment: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.commentPost(req.params.id);
  }),

};

export default postController;
