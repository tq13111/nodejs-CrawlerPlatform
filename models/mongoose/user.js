const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pbkdf2Async = require('util').promisify(require('crypto').pbkdf2)
const Password_config = require('../../cipher/password_config')
const HttpRequestParamError = require('../../errors/http_request_param_error')

const UserSchema = new Schema({
  username:
    {
      type: String, require: true,
      unique: true, index: 1
    },
  password: {
    type: String, require: true,
  },
  name:
    {
      type: String,
    },
  age: {type: Number, max: 122, min: 0}
})
const UserModel = mongoose.model('users', UserSchema)


async function insert(user) {
  return UserModel.create(user)
}

async function getUserById(id) {
  return await UserModel.findOne({_id: id},{password:0})
}

async function getUserByName(name) {
  return await UserModel.findOne({name})
}

async function list() {
  console.log(222)
  const match = {}
  const flow = UserModel.find(match)
  return await flow.exec()
}

async function createUserByNamePass(user) {
  const usernameDupUser = await UserModel.findOne({
    $or: [{
      username: user.username
    }, ]
  }, {_id: 1})
  const passToSave = await pbkdf2Async(user.password, Password_config.SALT, Password_config.ITERATION_TIMES, Password_config.KEY_LENGTH, Password_config.DIGEST)
  if (usernameDupUser) {
    console.log(usernameDupUser,'usernameDupUser')
    throw new HttpRequestParamError(
      'username', '用户名或昵称已经被占用啦，请再找一个吧~!',
      `duplicate username:${user.username}`
    )
  }
  const created = await insert({
    username: user.username,
    password: passToSave
  })
  return {
    _id:created._id,
    username:created.username,
    name:created.name,
  }
}

async function getUserByNamePass({username, password}) {
  const passToFound = await pbkdf2Async(password, Password_config.SALT, Password_config.ITERATION_TIMES, Password_config.KEY_LENGTH, Password_config.DIGEST)
  const found = await UserModel.findOne({
    username, password: passToFound
  },{password:0})

  return found
}

module.exports = {
  insert, getUserById, getUserByName, list,
  createUserByNamePass,getUserByNamePass
}
