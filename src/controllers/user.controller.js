const User = require('../models').User
const asyncMiddleware = require('../helper/publicFunction')

module.exports = {
  index: asyncMiddleware(async (req, res, next) =>  {
    // default limit 10 records
    let size = +req.query.size || 10
    let offset = +req.query.offset + 1 || 0
    const users = await User.findAll({
      limit: size,
      offset: offset,
      order: [ ['createdAt', 'DESC'] ] 
    })
    return users
  }),
  show: asyncMiddleware( async (req, res, next) =>  {
    const user = await User.find({
      where: { id: req.params.id }
    })
    return user
  }),
  new: asyncMiddleware(async (req, res, next) =>  {
    const user = await new User(req.body).save()
    return user
  }),
  updateAge: asyncMiddleware(async (req, res, next) =>  {
    return User.updateAge(req.params.id)
  }),
  delete: asyncMiddleware(async (req, res, next) =>  {
    const item = await User.destroy({where: {id: req.params.id}})
    return item !== 0? item : null
  })
}

/**
  * @api {GET} /users List users
  * @apiName List users
  * @apiGroup User
  * @apiVersion  1.0.0
  * @apiDescription List All User.
  * @apiParamExample  {URL} Request-Example:
  /api/users
  *
  * @apiSuccess {String} name Name of the User.
  * @apiSuccess {Number} age  Age of the User.
  * @apiSuccess {String} comment  Comment of the User.
  *
  * @apiSuccessExample {user} Success-Response:
  [
    {
      "id": 1,
      "name": "Quan Do H."
      "age": 22,
      "comment": "Quan is developer"
    },
    {
      "id": 2,
      "name": "Vi Nguyen H. T."
      "age": 29,
      "comment": "Vi is developer"
    }
  ]
*/

/**
  * @api {GET} /users/:id Read data of a user
  * @apiName Read data of a user
  * @apiGroup User
  * @apiVersion  1.0.0
  * @apiDescription Read full information of a user
  * 
  * @apiParam {Number} id Users unique ID.
  * @apiParamExample  {URL} Request-Example:
  /api/users/1
  *
  *
  * @apiSuccess {String} name Name of the User.
  * @apiSuccess {Number} age  Age of the User.
  * @apiSuccess {String} comment  Comment of the User.
  *
  * @apiSuccessExample {user} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 22,
    "comment": "Quan is developer"
  }
  * @apiError UserNotFound The id of the User was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message": "RecordNotFound"
  *     }
*/

/**
  * @api {POST} /users Create User
  * @apiName Create User
  * @apiGroup User
  * @apiVersion  1.0.0
  * @apiDescription Create new user
  * 
  * @apiParam {Number} age Required age of new User with maximum length of 3 characters.
  * @apiParam {String} name Required name of new User with maximum length of 10 charecters.
  * @apiParam {comment} comment Comment of new User ( can have linebreak ).
  * @apiParamExample  {URL} Request-Example:
  /api/users
  *
  *
  * @apiSuccess {String} name Name of the User.
  * @apiSuccess {Number} age  Age of the User.
  * @apiSuccess {String} comment  Comment of the User.
  *
  * @apiSuccessExample {user} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 23,
    "comment": "Quan is developer"
  }
  * @apiError RecordNotFound The id of the User was not found.
  * @apiError NameLengthValidation Name length must be less than or equal to 10 characters long.
  * @apiError NameRequiredValidation Name length must be less than or equal to 10 characters long.
  * @apiError AgeTypeValidation Age must be a number.
  * @apiError AgeLengthValidation Age must be less than or equal 3 characters.
  * @apiError AgeRequiredValidation Age is required.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message": "RecordNotFound"
  *     }
  *     HTTP/1.1 400 Bad Request
  *     {
  *       "message": "\"name\" length must be less than or equal to 10 characters long"
  *     }
  *     HTTP/1.1 400 Bad Request
  *     {
  *         "message": "\"name\" is required"
  *     }
  *     HTTP/1.1 400 Bad Request
  *     {
  *       "message": "\"age\" must be less than or equal 3 characters"
  *     }
  *     HTTP/1.1 400 Bad Request
  *     {
  *       "message": "\"age\" must be a number"
  *     }
  *     HTTP/1.1 400 Bad Request
  *     {
  *       "message": "\"age\" is required"
  *     }
*/

/**
  * @api {PATCH} /users/:id Increase Age of a User
  * @apiName Increase Age of a User
  * @apiGroup User
  * @apiVersion  1.0.0
  * @apiDescription Increase +1 for the age of certain User
  * 
  * @apiParam {Number} id Users unique ID.
  * @apiParamExample  {URL} Request-Example:
  /api/users/1
  *
  *
  * @apiSuccess {String} name Name of the User.
  * @apiSuccess {Number} age  Age of the User.
  * @apiSuccess {String} comment  Comment of the User.
  *
  * @apiSuccessExample {user} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 23,
    "comment": "Quan is developer"
  }
  * @apiError UserNotFound The id of the User was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message": "RecordNotFound"
  *     }
*/


/**
  * @api {DELETE} /users/:id Delete a User
  * @apiName Delete a User
  * @apiGroup User
  * @apiVersion  1.0.0
  * @apiDescription Delete certain User
  * 
  * @apiParam {Number} id Users unique ID.
  * @apiParamExample  {URL} Request-Example:
  /api/users/1
  *
  *
  * @apiSuccess {String} name Name of the User.
  * @apiSuccess {Number} age  Age of the User.
  * @apiSuccess {String} comment  Comment of the User.
  *
  * @apiSuccessExample {user} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 23,
    "comment": "Quan is developer"
  }
  * @apiError UserNotFound The id of the User was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message": "RecordNotFound"
  *     }
*/
