import express from 'express';
import postController from '../../controllers/post.controller';
import { validate } from '../../lib/utils';
import postchema from '../../schema/post.schema';

const router = express.Router();

router
  .route('/')
  /* GET all posts. */
  .get(postController.index)
  /* Create a post. */
  .post(validate(postchema.addPost), postController.new);
  
router
  .route('/:id')
  /* Show a post. */
  .get(postController.show)
  /* Update content of a post. */
  .put(postController.updateContent)
   /* Delete a character. */
  .delete(postController.delete);

export default router;
