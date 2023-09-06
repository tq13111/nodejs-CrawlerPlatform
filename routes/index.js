const express = require('express')
const router = express.Router()
const User=require('../models/in_memo/user');
const UserService=require('../services/user_service')
/* GET home page. */
router.get('/', function(req, res, next) {
  const {name,age} = req.query
  res.render('user', {
    user:new User(name,age)
  });
});


router.post('/add', function(req, res, next) {
  const user = req.body
  res.json(UserService.addUser(user));
});



module.exports = router;
