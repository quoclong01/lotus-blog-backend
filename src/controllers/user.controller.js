const User = require('../models').User
const asyncMiddleware = require('../helper/publicFunction')

module.exports = {
  index: asyncMiddleware(async (req, res, next) =>  {
    let size = 10
    let page = req.query.page || 1
    offset = size * (page - 1)
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
    return item
  })
}
