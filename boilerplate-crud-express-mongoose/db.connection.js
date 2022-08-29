require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : (process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('Connected db successfully')
})

module.exports = mongoose
