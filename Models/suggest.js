const mongoose = require('mongoose')

const suggest = new mongoose.Schema({
  message: { type: String },
  author: { type: String },
  votes: { type: Array },
})

module.exports = mongoose.model('Suggest-System', suggest)