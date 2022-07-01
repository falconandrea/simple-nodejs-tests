const Film = require('../models/film.model')

const getList = async () => {
  const films = await Film.find({})
  return films
}
const renderList = async (req, res) => {
  const films = await getList()
  res.render('pages/list', {
    films
  })
}

const newFilm = async (data) => {
  const film = new Film(data)
  return film.save()
}
const addNewFilmFromForm = async (req, res) => {
  if (!req.body.year) return res.status(500).send('Missing year')
  if (!req.body.title) return res.status(500).send('Missing title')

  await newFilm(req.body)
  renderList(req, res)
}

const findById = async (id) => {
  const film = await Film.findById(id)

  if (film) return film
  return null
}
const findByTitle = async (title) => {
  const film = await Film.findOne({ title })

  return film || null
}

const deleteFilm = async (id) => {
  const film = await findById(id)

  if (film) {
    await film.delete()
    return true
  }
  return false
}
const deleteFilmFromList = async (req, res) => {
  const result = await deleteFilm(req.params.id)
  if (!result) res.status(500).send('Film not found')

  renderList(req, res)
}

module.exports = {
  getList,
  renderList,
  findByTitle,
  newFilm,
  addNewFilmFromForm,
  deleteFilm,
  deleteFilmFromList
}
