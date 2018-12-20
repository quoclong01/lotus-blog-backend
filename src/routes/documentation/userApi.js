const Joi = require('joi')

exports.addUserSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  }).required()
}
