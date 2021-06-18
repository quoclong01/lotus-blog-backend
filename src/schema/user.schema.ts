import Joi from 'joi';

export default {
  addUser: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }).required()
};