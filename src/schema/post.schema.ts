import Joi from 'joi';

export default {
  addPost: Joi.object().keys({
    cover: Joi.string().required(),
    title: Joi.string().min(10),
    content: Joi.string().min(20),
    description: Joi.string().min(10),
    status: Joi.string(),
    tags: Joi.array().items(Joi.string())
  }).required(),
  addComment: Joi.object().keys({
    content: Joi.string().required(),
  }).required()
};
