module.exports = (model) => {
  // External Dependancies
  const boom = require('boom')
  
  // Get Data Models
  let obj = {};
  obj= require(`../../models`)

  return {
    boom: boom,
    model: obj[model],
    actions: {
      test: async (req, reply) => {
        try {
          return `${model} works`
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      index: async (req, reply) => {
        try {
          const items = await obj[model].findAll()
          return items
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      detail: async (req, reply) => {
        try {
          const item = await obj[model].find({
            where: { id: req.params.id }
          })
          return item
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      new: async (req, reply) => {
        try {
          const objectModel = obj[model]
          const createdObj = new objectModel(req.body)
          return createdObj.save()
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      update: async (req, reply) => {
        try {
          const updateData = req.body
          const updateItem = await obj[model].update(updateData, { where: { id: req.params.id } })
          return updateItem
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      delete: async (req, reply) => {
        try {
          const id = req.params.id
          const item = await obj[model].destroy({where: {id: id}})
          return item
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    }
  }
}
