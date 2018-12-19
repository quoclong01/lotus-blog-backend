// Import Swagger documentation
// const documentation = require('./documentation/carApi')
const router = require('../core/base/route')
let { controller, uri, routes } = router('user')
const Joi = require('joi')

/**
 * Adding new route here
 */

// Import Swagger documentation
const documentation = require('./documentation/userApi')
routes = [
  {
    method: 'GET',
    url: `/api/${uri}`,
    handler: controller.index
  },
  {
    method: 'GET',
    url: `/api/${uri}/test`,
    handler: controller.test
  },
  {
    method: 'GET',
    url: `/api/${uri}/:id`,
    handler: controller.detail
  },
  {
    method: 'POST',
    url: `/api/${uri}`,
    handler: controller.new,
    schema: documentation.addUserSchema,
    schemaCompiler: schema => data => Joi.validate(data, schema)
  },
  {
    method: 'PUT',
    url: `/api/${uri}/:id`,
    handler: controller.update,
    schema: documentation.addUserSchema,
    schemaCompiler: schema => data => Joi.validate(data, schema)
  },
  {
    method: 'DELETE',
    url: `/api/${uri}/:id`,
    handler: controller.delete
  }
]

module.exports = routes
