const list = async (req, res) => {
  const collection = req.server.mongo.db.collection('authors')
  const data = await collection.find().toArray() || []
  return res.json(data)
}

const create = async (req, res) => {
  if (!req.body.name) return res.status(500).send('Missing name')
  if (!req.body.surname) return res.status(500).send('Missing surname')

  const collection = req.server.mongo.db.collection('authors')
  const result = await collection.insertOne({
    name: req.body.name,
    surname: req.body.surname
  })

  return res.json(result)
}

const remove = async (req, res) => {
  const collection = req.server.mongo.db.collection('authors')
  const data = await collection.findOne({ id: req.params.id })

  if (data) {
    await collection.deleteOne(data)
    return res.json({ message: 'Deleted' })
  }
  return res.status(404).send('Item not found')
}

module.exports = {
  list,
  create,
  remove
}
