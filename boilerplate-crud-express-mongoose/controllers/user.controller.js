const Model = require('../models/user.model')

const list = async (req, res) => {
  const data = await Model.find({}).select(['_id', 'name', 'surname', 'full_name'])
  return res.json(data)
}

const create = async (req, res) => {
  if (!req.body.name) return res.status(500).send('Missing name')
  if (!req.body.surname) return res.status(500).send('Missing surname')

  const data = new Model(req.body)
  return data.save((err, data) => {
    if (err) return res.status(500).send(err)
    return res.json({ message: 'Created' })
  })
}

const remove = async (req, res) => {
  const data = await Model.findById(req.params.id)

  if (data) {
    await data.delete()
    return res.json({ message: 'Deleted' })
  }
  return res.status(404).send('Item not found')
}

module.exports = {
  list,
  create,
  remove
}
