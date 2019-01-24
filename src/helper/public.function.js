const APIError = require('../lib/apiError')
const HttpStatus = require('http-status')

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .then(data =>  {
      if (data == null) throw next(new APIError(HttpStatus.NOT_FOUND, 'RecordNotFound'))
      res.json(data) 
    })
    .catch(next)
}

module.exports = asyncMiddleware
