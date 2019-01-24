const Joi = require('joi')

exports.addCharacter = {
  body: Joi.object().keys({
    name: Joi.string().max(10).required(),
    age: Joi.number().integer().max(999).required()
      .options({
        language: {
          number: { max: 'must be less than or equal 3 characters' }
        }
      })
  }).required()
}
