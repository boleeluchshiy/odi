const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      unique: true,
      required: true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
   },
   password: {
      type: String,
   },
   dateCreated: {
      type: Date,
      default: Date.now,
   },
})

exports.User = mongoose.model('user', UserSchema)
