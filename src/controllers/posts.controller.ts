import { Request, Response, NextFunction } from 'express';
import { Posts } from '../models/Posts';
import { responseMiddleware } from '../lib/utils';

const defaultSize = 10;

const postsController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    // default limit 10 records
    const size = +req.query.size || defaultSize;
    const offset = +req.query.offset || 0;
    // get n record from offset
    const data = await Posts.findAll({
      limit: size,
      offset,
      order: [ ['createdAt', 'DESC'] ]
    });
    // get total record
    const length = await Posts.count();
    /**
     * Validate for load more
     * if loaded records less than total records, turn on load more
     * loaded records calculate from the offset combined with items per page
     */
    const status = (offset + size) < length;
    return { posts: data, loadMore: status };
  }),
  new: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Posts.createPosts(req.body);
  }),
  show: responseMiddleware( async (req: Request, res: Response, next: NextFunction) =>  {
    return await Posts.findOne({
      where: { id: req.params.id }
    });
  }),
  updateContent: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    return Posts.updateContent(req.params.id, req.body);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Posts.removePost(req.params.id);
  })
};

export default postsController;