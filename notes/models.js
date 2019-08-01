const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
   title: {
      type: String,
      default: 'Не названо.',
      required: true,
   },
   desc: {
      type: String,
      default: 'Не описано.',
   },
   date: {
      type: Date,
      default: Date.now,
   },
})

exports.Note = mongoose.model('note', NoteSchema)
