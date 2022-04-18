const mongoose = require('mongoose')

const ckdb = new mongoose.Schema({
    guild: String,
    user: String,
    content: Array //lets try again
})

module.exports = mongoose.model("ckdb", ckdb);