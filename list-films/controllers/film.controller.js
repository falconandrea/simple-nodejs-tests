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
  return await film.save()
}
const addNewFilmFromForm = async (req, res) => {
  try {
    if (!req.body.year) throw new Error('Missing year')
    if (!req.body.title) throw new Error('Missing title')

    await newFilm(req.body)
    renderList(req, res)
  } catch (error) {
    res.status(500).send(error)
  }
}

const findById = async (id) => {
  const film = await Film.findById(id)

  if (film) return film
  else return null
}

const deleteFilm = async (id) => {
  const film = await findById(id)

  if (film) {
    film.delete()
    return true
  } else return false
}
const deleteFilmFromList = async (req, res) => {
  try {
    if (!req.params.id) throw new Error('Missing ID')
    const result = await deleteFilm(req.params.id)
    if (result) renderList(req, res)
    else throw new Error('Film not found')
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

module.exports = {
  getList,
  renderList,
  newFilm,
  addNewFilmFromForm,
  deleteFilm,
  deleteFilmFromList
}
