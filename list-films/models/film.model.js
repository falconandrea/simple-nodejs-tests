require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('Connected db successfully')
})

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
