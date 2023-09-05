const  User = require('../models/in_memo/user')
const  Subscription = require('../models/in_memo/Subscription')

module.exports.getAllUsers=function () {
  return User.users
}

module.exports.addUser=function (user) {
  return User.insert(user)
}

module.exports.getUserById=function (id) {
  return User.getUserById(id)
}

module.exports.createSubscription=function (userId,url) {
 const user=  User.getUserById(userId)
  console.log(userId,user,url)
  if(!user) throw new Error('no such user')
  const sub=Subscription.insert(userId,url)
  console.log(sub)
  return sub

}