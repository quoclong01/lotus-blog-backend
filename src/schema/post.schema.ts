import Joi from 'joi';

export default {
  addPost: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string(),
    tags: Joi.array().items(Joi.string())
  }).required(),
  addComment: Joi.object().keys({
    content: Joi.string().required(),
  }).required()
};
