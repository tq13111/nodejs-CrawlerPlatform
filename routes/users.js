const express = require('express')
const router = express.Router()
const UserService=require('../services/user_service')


/* GET users listing. */
router.get('/',  function(req, res, next) {
  (async ()=>{
    const a=await UserService.getAllUsers()
    res.render('users', {
        users: a
      }
    )
  })()

});


router.get('/:userId',async function(req, res, next) {
  const userId = req.params.userId
  const user = await UserService.getUserById(userId)
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
