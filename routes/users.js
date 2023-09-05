var express = require('express');
var router = express.Router();
const UserService=require('../services/user_service')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', {
      users:  UserService.getAllUsers()
    }
  )
});


router.get('/:userId', function(req, res, next) {
  const userId = req.params.userId
  const user = UserService.getUserById(Number(userId))
  res.locals.user = user
  res.render('user')
});

router.post('/:userId/subscription', function(req, res, next) {
  const {userId} = req.params
  const {url} = req.body
  const subscription = UserService.createSubscription(Number(userId),url)
  res.json(subscription)
});



module.exports = router;
