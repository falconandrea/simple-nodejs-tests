const { mongoose } = require('../db.connection')

const URLSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('URL', URLSchema)
