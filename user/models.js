const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
   },
})

exports.User = mongoose.model('user', UserSchema)
