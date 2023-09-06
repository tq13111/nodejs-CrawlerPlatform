const mongoose = require('mongoose')
mongoose.Promise = Promise
const url = 'mongodb://localhost:27017/test'
 mongoose.connect(url, {useMongoClient: true})
const db = mongoose.connection
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name:
    {
      type: String, require: true,
      unique: true,
    },
  age: {type: Number, max: 188, min: 0}
})
const UserModel = mongoose.model('users', UserSchema);
(async () => {
  const user = await UserModel.create(
    {name: 'xxx1',age: 111}
  )

  return user
})()
  .then(r => {
    console.log(r)
  })
  .catch(e => console.log(e))

db.on('open', function () {
  console.log('connection opened')
})
db.on('error', function () {
  console.log('failed')
})