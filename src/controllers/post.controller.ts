import { Comment } from './../models/Comments';
import { Like } from './../models/Like';
import { PostErrors } from './../lib/api-error';
import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { responseMiddleware } from '../lib/utils';

const postController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.listPosts(req.query);
  }),
  new: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.createPost(req.body, req.user);
  }),
  show: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.getPost(req.params.id);
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
    return Like.doLike(req.params.id, req.user);
  }),
  getlikes: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Like.findAll({ attributes: ['userId'], where: { postId: req.params.id } });
  }),
  getcomments: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Comment.findAll({ where: { postId: req.params.id } });
  }),
  comment: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Comment.commentPost(req.params.id, req.user, req.body);
  }),

};

export default postController;
