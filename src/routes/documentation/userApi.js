const Joi = require('joi')

exports.addUserSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  }).required(),
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'number' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
      }
    }
  }
}
