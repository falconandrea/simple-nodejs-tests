const { mongoose } = require('../db.connection')

const FilmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Film', FilmSchema)
