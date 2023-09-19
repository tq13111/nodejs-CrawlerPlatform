const express = require('express')
const router = express.Router()
const User = require('../models/in_memo/user')
const UserService = require('../services/user_service')
const JWT = require('jsonwebtoken')
const crypto = require('crypto')

/* GET home page. */
router.get('/', function (req, res, next) {
  const {name, age} = req.query
  res.render('user', {
    user: new User(name, age)
  })
})

router.get('/login', (req, res, next) => {
  const {username,password} = req.query
  const key = crypto.pbkdf2Sync(
    password,
    "agoaisd",
    2, 16, 'sha256')
  const user = {username, expiredAt: Date.now().valueOf() + (20 * 60 * 1000)}
  const token = JWT.sign(user, 'agoaisdjfaljgasdf')
  res.send(token)
})


router.get('/hello', (req, res, next) => {
  const auth = req.get('Authorization')
  if (!auth) {
    return res.send('no auth')
  }
  if (!(auth.index0f('Bearer') === -1)) {
    res.send('no auth')
  }
  const token = auth.split('Bearer')[1]
  const user = JWT.verify(token, 'agoaisdifaligasdf')
  if (user.expiredAt < Date.now().valueOf()) {
    res.send('no auth')
  }
  res.send(user)
})


router.post('/add', function (req, res, next) {
  const user = req.body
  res.json(UserService.addNewUser(user))
})


module.exports = router
