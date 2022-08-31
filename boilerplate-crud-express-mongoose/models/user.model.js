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

UserSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

UserSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('User', UserSchema)
