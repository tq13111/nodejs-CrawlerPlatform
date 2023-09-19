const User = require('../models/mongoose/user')
const Subscription = require('../models/in_memo/Subscription')
const HttpRequestParamError = require('../errors/http_request_param_error')
const NoSuchUserError = require('../errors/no_such_user_error')
const JWT=require('jsonwebtoken')
const JWTConfig=require('../cipher/jwt_config')
async function getAllUsers() {

  return await User.list()
}

async function addNewUser(user) {
  if (!user || !user.username ||
    !user.password) {
    throw new HttpRequestParamError
    ('user', '用户名或密码不能为空', 'empty username or password !')
  }
  const created = await User.createUserByNamePass(user)
  const token=JWT.sign({
    id: created._id.toString(),
    expireAt: Date.now().valueOf() + JWTConfig.expireIn,
  },JWTConfig.SECRET)
  return {user:created,token}

}

async function loginWithNamePass(user) {
  if (!user || !user.username ||
    !user.password) {
    throw new HttpRequestParamError
    ('user', '用户名或密码不能为空',
      'empty username or password !')
  }
  const found = User.getUserByNamePass(user)
  if (!found) {throw new NoSuchUserError(null, user.username)}
  const token=JWT.sign({
    id: found._id.toString(),
    expireAt: Date.now().valueOf() + JWTConfig.expireIn,
  },JWTConfig.SECRET)
  return {token,user:found}
}

async function getUserById(id) {
  return await User.getUserById(id)
}

async function createSubscription(userId, url) {
  const user = User.getUserById(userId)
  console.log(userId, user, url)
  if (!user) throw new Error('no such user')
  const sub = Subscription.insert(userId, url)
  console.log(sub)
  return await sub

}

module.exports = {
  getAllUsers, addNewUser, getUserById,
  createSubscription,loginWithNamePass
}