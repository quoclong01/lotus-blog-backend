import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { responseMiddleware } from '../lib/utils';

const defaultSize = 10;

const postController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    // default limit 10 records
    const size = +req.query.size || defaultSize;
    const offset = +req.query.offset || 0;
    // get n record from offset
    const data = await Post.findAll({
      limit: size,
      offset,
      order: [['createdAt', 'DESC']]
    });
    // get total record
    const length = await Post.count();
    /**
     * Validate for load more
     * if loaded records less than total records, turn on load more
     * loaded records calculate from the offset combined with items per page
     */
    const status = (offset + size) < length;
    return { posts: data, loadMore: status };
  }),
  new: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.createPost(req.body);
  }),
  show: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.findOne({
      where: { id: req.params.id }
    });
  }),
  updateContent: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.updateContent(req.params.id, req.body);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.removePost(req.params.id);
  }),
  restore: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Post.restorePost(req.params.id);
  })
};

export default postController;
