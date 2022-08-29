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

// Example Virtual Field
UserSchema
  .virtual('full_name')
  .get(function () {
    return `${this.name} ${this.surname}`
  })

module.exports = mongoose.model('User', UserSchema)
