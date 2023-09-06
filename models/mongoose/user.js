const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name:
    {
      type: String, require: true,
      unique: true, index: 1
    },
  age: {type: Number, max: 122, min: 0}
})
const UserModel = mongoose.model('users', UserSchema)


async function insert(user) {
  return  UserModel.create(user)
}

async function getUserById(id) {
  return await UserModel.findOne({_id: id})
}

async function getUserByName(name) {
  return await UserModel.findOne({name})
}
async function list() {
  console.log(222)
  const match = {}
  const flow = UserModel.find(match);
  return await flow.exec();
}

module.exports ={
  insert,getUserById,getUserByName,list
}
