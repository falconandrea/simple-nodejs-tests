const Model = require('../models/user.model')

const list = async (req, res) => {
  const result = await Model.find({}).select([
    '_id',
    'name',
    'surname',
    'full_name'
  ])
  return res.json(result)
}

const create = async (req, res) => {
  if (!req.body.name) return res.status(500).send('Missing name')
  if (!req.body.surname) return res.status(500).send('Missing surname')

  const result = new Model(req.body)
  return result.save((err, data) => {
    if (err) return res.status(500).send(err)
    return res.json({ message: 'Created' })
  })
}

const remove = async (req, res) => {
  const result = await Model.findById(req.params.id)

  if (result) {
    await result.delete()
    return res.json({ message: 'Deleted' })
  }
  return res.status(404).send('Item not found')
}

module.exports = {
  list,
  create,
  remove
}
