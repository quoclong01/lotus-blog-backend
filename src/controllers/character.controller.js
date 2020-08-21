const Character = require('../models').Character
const asyncMiddleware = require('../helper/public.function')

const defaultSize = 10;

module.exports = {
  index: asyncMiddleware(async (req, res, next) =>  {
    // default limit 10 records
    let size = +req.query.size || defaultSize
    let offset = +req.query.offset || 0
    // get n record from offset
    const data = await Character.findAll({
      limit: size,
      offset: offset,
      order: [ ['createdAt', 'DESC'] ] 
    })
    // get total record
    const length = await Character.count()
    /**
     * Validate for load more
     * if loaded records less than total records, turn on load more
     * loaded records calculate from the offset combined with items per page
     */
    const status = (offset + size) < length
    return { characters: data, loadMore: status }
  }),
  show: asyncMiddleware( async (req, res, next) =>  {
    return await Character.find({
      where: { id: req.params.id }
    })
  }),
  new: asyncMiddleware(async (req, res, next) =>  {
    return await Character.createCharacter(req.body)
  }),
  updateAge: asyncMiddleware(async (req, res, next) =>  {
    return Character.updateAge(req.params.id)
  }),
  delete: asyncMiddleware(async (req, res, next) =>  {
    return Character.removeCharacter(req.params.id)
  })
}
