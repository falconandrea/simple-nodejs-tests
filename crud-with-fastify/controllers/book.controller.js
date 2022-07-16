const { ObjectId } = require('@fastify/mongodb')

const list = async (req, res) => {
  const collection = req.server.mongo.db.collection('books')
  const data = (await collection.find().toArray()) || []
  return res.send(data)
}

const create = async (req, res) => {
  const collection = req.server.mongo.db.collection('books')
  const { title, year } = req.body
  const authors = req.body.authors.map((item) => new ObjectId(item))
  const result = await collection.insertOne({
    title,
    year,
    authors
  })

  return res.send({ id: result.insertedId })
}

const get = async (req, res) => {
  const collection = req.server.mongo.db.collection('books')
  const data = await collection.findOne({ _id: new ObjectId(req.params.id) })

  if (!data) throw new Error('Item not found')
  return res.send(data)
}

const remove = async (req, res) => {
  const collection = req.server.mongo.db.collection('books')
  const data = await collection.findOne({ _id: new ObjectId(req.params.id) })

  if (!data) throw new Error('Item not found')

  await collection.deleteOne(data)
  return res.send({ message: 'Deleted' })
}

module.exports = {
  list,
  get,
  create,
  remove
}
