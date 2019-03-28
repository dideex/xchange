const mongoose = require('mongoose')
const mongoConfig = require('./config.json').mongodb

module.exports = mongoose.connect(mongoConfig, {useNewUrlParser: true})
