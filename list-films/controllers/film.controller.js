const Film = require('../models/film.model')

const getList = async () => {
  const films = await Film.find({})
  return films ?? []
}

const newFilm = async (data) => {
  const film = new Film(data)
  return await film.save()
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

module.exports = {
  getList,
  newFilm,
  deleteFilm
}
