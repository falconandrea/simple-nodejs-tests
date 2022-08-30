const { default: mongoose } = require('mongoose')
const Model = require('../models/user.model')

const list = async (req, res) => {
  const result = await Model.find({}).select([
    '_id',
    'name',
    'surname',
    'status'
  ])
  return res.json(result)
}

const create = async (req, res) => {
  if (!req.body.name) return res.status(500).json({message: 'Missing name'})
  if (!req.body.surname) return res.status(500).json({message: 'Missing surname'})

  const result = new Model(req.body)
  return result.save((err, data) => {
    if (err) return res.status(500).send(err)
    return res.json({ message: 'Created' })
  })
}

const remove = async (req, res) => {
  if(!mongoose.isValidObjectId(req.params.id)) return res.status(500).json({message: 'Item ID not valid'})

  const result = await Model.findById(req.params.id)
  if (result) {
    await result.delete()
    return res.json({ message: 'Deleted' })
  }
  return res.status(404).json({message: 'Item not found'})
}

module.exports = {
  list,
  create,
  remove
}
