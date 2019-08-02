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

   password: String,

   dateCreated: {
      type: Date,
      default: Date.now,
   },

   givenName: String,
   familyName: String,

   //membership
   googleId: {
      type: String,
   },

   // facebookId: {
   //    type: String,
   //    unique: true,
   // },

   // vkId: {
   //    type: String,
   //    unique: true,
   // },
})

exports.User = mongoose.model('user', UserSchema)
