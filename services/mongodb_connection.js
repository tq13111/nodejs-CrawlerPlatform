const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/test'
mongoose.connect(url, {useMongoClient: true})
const db = mongoose.connection


db.on('open', function () {
  console.log('connection opened')
})
db.on('error', function () {
  console.log('failed')
})
module.exports = db