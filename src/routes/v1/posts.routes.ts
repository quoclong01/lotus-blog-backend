import express from 'express';
import postsController from '../../controllers/posts.controller';
import { validate } from '../../lib/utils';
import postschema from '../../schema/posts.schema';

const router = express.Router();

router
  .route('/')
  /* GET all posts. */
  .get(postsController.index)
  /* Create a post. */
  .post(validate(postschema.addPost), postsController.new);
  
router
  .route('/:id')
  /* Show a post. */
  .get(postsController.show)
  /* Update content of a post. */
  .put(postsController.updateContent)
   /* Delete a character. */
  .delete(postsController.delete);
 
export default router;