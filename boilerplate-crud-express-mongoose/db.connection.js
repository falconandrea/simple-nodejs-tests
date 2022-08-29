require('dotenv').config()
const mongoose = require('mongoose')

let dbConnection = ''
if (process.env.NODE_ENV === 'production') {
  dbConnection = process.env.MONGO_URI_PROD
} else if (process.env.NODE_ENV === 'test') {
  dbConnection = process.env.MONGO_URI_TEST
} else {
  dbConnection = process.env.MONGO_URI
}

mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('Connected db successfully')
})

module.exports = mongoose
