const APIError = require('../lib/api-error')
const HttpStatus = require('http-status')

/**
  * @functionName asyncMiddleware
  * @functionDescription Handle result of a function before send to client
  * @functionReturn render data to Client-side or throw Error
  * @params Function
  **/
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .then(data =>  {
      if (data == null) throw next(new APIError(HttpStatus.NOT_FOUND, 'RecordNotFound'))
      res.json(data) 
    })
    .catch(next)
}

module.exports = asyncMiddleware
