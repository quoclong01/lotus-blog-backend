import Joi from 'joi';

export default {
  addBookmark: Joi.object().keys({
    postId: Joi.string().required(),
  }).required()
};
