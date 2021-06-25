import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { responseMiddleware } from '../lib/utils';

const defaultSize = 10;

const postController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.listPosts(req.query);
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
