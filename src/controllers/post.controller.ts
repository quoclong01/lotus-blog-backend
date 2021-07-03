import { Comment } from './../models/Comment';
import { Like } from './../models/Like';
import { PostErrors } from './../lib/api-error';
import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { responseMiddleware } from '../lib/utils';

const postController = {
  publicIndex: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.listPosts(req.query);
  }),
  authIndex: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.listAuthPosts(req.query, req.user);
  }),
  recommendIndex: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.listRecommendPosts(req.query);
  }),
  getDeletedPosts: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.listDeletedPosts(req.query, req.user);
  }),
  new: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.createPost(req.body, req.user);
  }),
  newDraft: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.createDraft(req.body, req.user);
  }),
  getDrafts: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return await Post.getlistDrafts(req.user);
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
    return Like.toggleLike(req.params.id, req.user);
  }),
  getLikes: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Like.getLikes(req.params.id);
  }),
  getComments: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Comment.getComments(req.params.id);
  }),
  comment: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return Comment.doComment(req.params.id, req.user, req.body);
  }),

};

export default postController;
