const express = require('express')
const router = express.Router()
const UserService=require('../services/user_service')
const HTTPReqParamsError=require('../errors/http_request_param_error')

/* GET users listing. */
router.get('/',  async function(req, res, next) {
  const a=await UserService.getAllUsers()
  res.render('users', {
      users: a
    }
  )

});


router.get('/:userId', function(req, res, next) {
  (async ()=>{
    const {userId} = req.params
    if(userId.length<10) throw new HTTPReqParamsError(
      'userId','用户Id不能为空',
      'user id can not be empty')
    const user = await UserService.getUserById(userId)
    res.locals.user = user
    res.render('user')
  })().catch((e)=>{
    next(e)
  })

});

router.post('/:userId/subscription', function(req, res, next) {
  const {userId} = req.params
  const {url} = req.body
  const subscription = UserService.createSubscription(Number(userId),url)
  res.json(subscription)
});



module.exports = router;
