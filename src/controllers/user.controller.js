const User = require('../models').User;
const asyncMiddleware = require('../helper/publicFunction')

module.exports = {
  index: asyncMiddleware(async (req, res, next) =>  {
    const items = await User.findAll()
    res.json(items)
  }),
  show: asyncMiddleware(async (req, res, next) =>  {
    const item = await User.find({
      where: { id: req.params.id }
    })
    res.json(item)
  }),
  new: asyncMiddleware(async (req, res, next) =>  {
    let item = new User(req.body)
    res.json(await item.save())
  }),
  update: asyncMiddleware(async (req, res, next) =>  {
    const updateItem = await User.update(req.body, { where: { id: req.params.id } })
    res.json(updateItem)
  }),
  delete: asyncMiddleware(async (req, res, next) =>  {
    const item = await User.destroy({where: {id: req.params.id}})
    res.json(item)
  })
}
