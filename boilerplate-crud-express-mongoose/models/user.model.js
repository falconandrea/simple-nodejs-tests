const { mongoose } = require('../db.connection')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  updated: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', UserSchema)
