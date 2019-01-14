const Character = require('../models').Character
const asyncMiddleware = require('../helper/publicFunction')

module.exports = {
  index: asyncMiddleware(async (req, res, next) =>  {
    // default limit 10 records
    let size = +req.query.size || 10
    let offset = +req.query.offset || 0
    const data = await Character.findAll({
      limit: size,
      offset: offset,
      order: [ ['createdAt', 'DESC'] ] 
    })
    const length = await Character.count()
    const status = offset + size < length
    return {characters: data, loadMore: status}
  }),
  show: asyncMiddleware( async (req, res, next) =>  {
    const character = await Character.find({
      where: { id: req.params.id }
    })
    return character
  }),
  new: asyncMiddleware(async (req, res, next) =>  {
    return await Character.createComment(req.body)
  }),
  updateAge: asyncMiddleware(async (req, res, next) =>  {
    return Character.updateAge(req.params.id)
  }),
  delete: asyncMiddleware(async (req, res, next) =>  {
    const item = await Character.destroy({where: {id: req.params.id}})
    return item !== 0? item : null
  })
}

/**
  * @api {GET} /characters List characters
  * @apiName List characters
  * @apiGroup Character
  * @apiVersion  1.0.0
  * @apiDescription List All Character.
  * @apiParamExample  {URL} Request-Example:
  /api/characters
  *
  * @apiSuccess {String} name Name of the Character.
  * @apiSuccess {Number} age  Age of the Character.
  * @apiSuccess {String} comment  Comment of the Character.
  * @apiSuccess {Boolean} loadMore Can load more characters or not.
  *
  * @apiSuccessExample {character} Success-Response:
  {
    data: [
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
    ],
    loadMore: true
  }
*/

/**
  * @api {GET} /characters/:id Read data of a character
  * @apiName Read data of a character
  * @apiGroup Character
  * @apiVersion  1.0.0
  * @apiDescription Read full information of a character
  * 
  * @apiParam {Number} id Characters unique ID.
  * @apiParamExample  {URL} Request-Example:
  /api/characters/1
  *
  *
  * @apiSuccess {String} name Name of the Character.
  * @apiSuccess {Number} age  Age of the Character.
  * @apiSuccess {String} comment  Comment of the Character.
  *
  * @apiSuccessExample {character} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 22,
    "comment": "Quan is developer"
  }
  * @apiError CharacterNotFound The id of the Character was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message": "RecordNotFound"
  *     }
*/

/**
  * @api {POST} /characters Create Character
  * @apiName Create Character
  * @apiGroup Character
  * @apiVersion  1.0.0
  * @apiDescription Create new character
  * 
  * @apiParam {Number} age Required age of new Character with maximum length of 3 characters.
  * @apiParam {String} name Required name of new Character with maximum length of 10 charecters.
  * @apiParam {comment} comment Comment of new Character ( can have linebreak ).
  * @apiParamExample  {URL} Request-Example:
  /api/characters
  *
  *
  * @apiSuccess {String} name Name of the Character.
  * @apiSuccess {Number} age  Age of the Character.
  * @apiSuccess {String} comment  Comment of the Character.
  *
  * @apiSuccessExample {character} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 23,
    "comment": "Quan is developer"
  }
  * @apiError RecordNotFound The id of the Character was not found.
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
  * @api {PATCH} /characters/:id Increase Age of a Character
  * @apiName Increase Age of a Character
  * @apiGroup Character
  * @apiVersion  1.0.0
  * @apiDescription Increase +1 for the age of certain Character
  * 
  * @apiParam {Number} id Characters unique ID.
  * @apiParamExample  {URL} Request-Example:
  /api/characters/1
  *
  *
  * @apiSuccess {String} name Name of the Character.
  * @apiSuccess {Number} age  Age of the Character.
  * @apiSuccess {String} comment  Comment of the Character.
  *
  * @apiSuccessExample {character} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 23,
    "comment": "Quan is developer"
  }
  * @apiError CharacterNotFound The id of the Character was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message": "RecordNotFound"
  *     }
*/


/**
  * @api {DELETE} /characters/:id Delete a Character
  * @apiName Delete a Character
  * @apiGroup Character
  * @apiVersion  1.0.0
  * @apiDescription Delete certain Character
  * 
  * @apiParam {Number} id Characters unique ID.
  * @apiParamExample  {URL} Request-Example:
  /api/characters/1
  *
  *
  * @apiSuccess {String} name Name of the Character.
  * @apiSuccess {Number} age  Age of the Character.
  * @apiSuccess {String} comment  Comment of the Character.
  *
  * @apiSuccessExample {character} Success-Response:
  {
    "id": 1,
    "name": "Quan Do H."
    "age": 23,
    "comment": "Quan is developer"
  }
  * @apiError CharacterNotFound The id of the Character was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message": "RecordNotFound"
  *     }
*/
