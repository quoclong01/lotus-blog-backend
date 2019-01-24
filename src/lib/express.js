const config = require('../config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const validate = require('express-validation')
const HttpStatus = require('http-status')
const APIError = require('./api-error')
const routes = require('../routes')

const app = express()

// if (config.env === 'development') {
//   app.use(logger('development'))
// }

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount all routes on / path
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const e = new APIError(HttpStatus.NOT_FOUND)
  return next(e)
});

// error converter
app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const msg = err.errors.map(error => error.messages.join('. ')).join(' and ')
    const e = new APIError(HttpStatus.BAD_REQUEST, `${msg}`)
    return next(e)
  } else if (!(err instanceof APIError)) {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR
    const e = new APIError(status, err.message)
    return next(e)
  }
  return next(err)
})


// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  const status = err.status
  const msg = err.message || HttpStatus[status]
  return res.status(status).json({
    message: msg
  })
})

module.exports = app
