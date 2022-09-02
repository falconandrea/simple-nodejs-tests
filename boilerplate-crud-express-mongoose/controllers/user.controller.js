const mongoose = require('mongoose')
const Model = require('../models/user.model')

const list = async (req, res) => {
  const condition = {}
  if (req.query.name) {
    condition.name = { $regex: new RegExp(req.query.name), $options: 'i' }
  }
  if (req.query.surname) {
    condition.surname = { $regex: new RegExp(req.query.surname), $options: 'i' }
  }
  if (req.query.status) {
    condition.status =
      req.query.status === true ||
      req.query.status === 1 ||
      req.query.status === '1'
        ? 1
        : 0
  }

  const result = await Model.find(condition).select([
    'id',
    'name',
    'surname',
    'status'
  ])
  return res.json(result)
}

const create = async (req, res) => {
  if (!req.body.name) {
    return res.status(500).json({ message: 'Missing name' })
  }
  if (!req.body.surname) {
    return res.status(500).json({ message: 'Missing surname' })
  }

  const result = new Model({
    name: req.body.name,
    surname: req.body.surname,
    status:
      req.body.status &&
      (req.body.status === true ||
        req.body.status === '1' ||
        req.body.status === 1)
        ? 1
        : false
  })
  return result.save((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Item'
      })
    }
    return res.json({ message: 'Created' })
  })
}

const get = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).json({ message: 'Item ID not valid' })
  }

  const result = await Model.findById(req.params.id)
  if (result) {
    return res.json(result)
  }
  return res.status(404).json({ message: 'Item not found' })
}

const update = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).json({ message: 'Item ID not valid' })
  }

  const result = await Model.findById(req.params.id)
  if (result) {
    if (req.body.name) result.name = req.body.name
    if (req.body.surname) result.surname = req.body.surname
    if (req.body.status) result.status = req.body.status

    return result.save((err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message || 'Some error occurred while updating the Item'
        })
      }
      return res.json({ message: 'Updated' })
    })
  }
  return res.status(404).json({ message: 'Item not found' })
}

const remove = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).json({ message: 'Item ID not valid' })
  }

  const result = await Model.findById(req.params.id)
  if (result) {
    await result.delete()
    return res.json({ message: 'Deleted' })
  }
  return res.status(404).json({ message: 'Item not found' })
}

module.exports = {
  list,
  get,
  create,
  update,
  remove
}
