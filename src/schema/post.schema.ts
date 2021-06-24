import Joi from 'joi';

export default {
  addPost: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
  }).required()
};
