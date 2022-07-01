const Film = require('../models/film.model')

const getList = async (req, res) => {
  const films = await Film.find({}).select(['id', 'title', 'year'])
  return res.json(films)
}
const renderList = async (req, res) => {
  const films = await Film.find({}).select(['id', 'title', 'year'])
  res.render('pages/list', {
    films
  })
}

const create = async (req, res) => {
  if (!req.body.year) return res.status(500).send('Missing year')
  if (!req.body.title) return res.status(500).send('Missing title')

  const film = new Film({
    title: req.body.title,
    year: req.body.year
  })
  return film.save((err, data) => {
    if (err) return res.status(500).send(err)
    return res.json({
      title: data.title,
      year: data.year,
      id: data._id
    })
  })
}

const findByTitle = async (title) => {
  const film = await Film.findOne({ title })

  return film || null
}

const remove = async (req, res) => {
  const film = await Film.findById(req.params.id)

  if (film) {
    await film.delete()
    return res.json({ message: 'Deleted' })
  }
  return res.status(404).send('Film not found')
}

module.exports = {
  getList,
  renderList,
  findByTitle,
  create,
  remove
}
