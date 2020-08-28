import Joi from 'joi';

export default {
  addCharacter: Joi.object().keys({
    name: Joi.string().max(10).required(),
    comment: Joi.string().required(),
    age: Joi.number().integer().max(999).required()
  }).required()
};
