import express from 'express';
import characterController from '../../controllers/character.controller';
import { validate } from '../../lib/utils';
import characterSchema from '../../schema/character.schema';

const router = express.Router();

router
  .route('/')
  /* GET all characters. */
  .get(characterController.index)
  /* Create a character. */
  .post(validate(characterSchema.addCharacter), characterController.new);

router
  .route('/:id')
  /* Show a character. */
  .get(characterController.show)
  /* Update age of a character. */
  .patch(characterController.updateAge)
  /* Delete a character. */
  .delete(characterController.delete);

export default router;