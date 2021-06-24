import Joi from 'joi';

export default {
  addUser: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required()
  }).required(),
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }),
  changePassword: Joi.object().keys({
    password: Joi.string().required()
  }),
  updatePersonalInfo: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required()
  }),
  resetPassword: Joi.object().keys({
    email: Joi.string().required()
  })
};
