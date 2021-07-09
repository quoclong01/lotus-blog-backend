import Joi from 'joi';

export default {
  addUser: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    displayName: Joi.string().required(),
    phone: Joi.string(),
    picture: Joi.string()
  }).required(),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  changePassword: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  }),
  updatePersonalInfo: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    displayName: Joi.string().required(),
    picture: Joi.string()
  }),
  resetPassword: Joi.object().keys({
    email: Joi.string().email().required()
  })
};
