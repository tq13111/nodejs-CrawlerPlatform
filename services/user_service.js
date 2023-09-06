const  User = require('../models/mongoose/user')
const  Subscription = require('../models/in_memo/Subscription')

module.exports.getAllUsers=async function () {
  
  return await User.list()
}

module.exports.addUser=async function (user) {
  return await User.insert(user)
}

module.exports.getUserById=async function (id) {
  return await User.getUserById(id)
}

module.exports.createSubscription=async function (userId,url) {
 const user=  User.getUserById(userId)
  console.log(userId,user,url)
  if(!user) throw new Error('no such user')
  const sub=Subscription.insert(userId,url)
  console.log(sub)
  return await sub

}