const express = require('express')
const router = express.Router()
const UserService=require('../services/user_service')
const HTTPReqParamsError=require('../errors/http_request_param_error')
const auth=require('../middlewares/auth')
const apiRes=require('../utils/apiRes')

/* GET users listing. */
router.post('/login',   function(req, res, next) {
  (async ()=>{
    const user = req.body
    const result=await UserService.loginWithNamePass(user)
    return result
  })().then((r)=>{
    res.data=r
    apiRes(req, res)
  }).catch((e)=>{
    next(e)
  })

});

router.post('/',   function(req, res, next) {
  (async ()=>{
    const user = req.body
    const result = await UserService.addNewUser(user)
    return result
  })().then((e)=>{
    res.data=e
    apiRes(req, res)
  }).catch((e)=>{
    next(e)
  })
});


router.get('/:userId', function(req, res, next) {
  (async ()=>{
    const {userId} = req.params
    if(userId.length<10) throw new HTTPReqParamsError(
      'userId','用户Id不能为空',
      'user id can not be empty')
    const user = await UserService.getUserById(userId)
    return user
  })().then((e)=>{
    res.data=e
    apiRes(req, res)
  }).catch((e)=>{
    next(e)
  })

});

router.post('/:userId/subscription', auth(),function(req, res, next) {
  (async ()=>{
    const {userId} = req.params
    const {url} = req.body
    const subscription =await UserService.createSubscription(userId,url)
    return subscription
  })().then((e)=>{
    res.data=e
    apiRes(req, res)
  }).catch((e)=>{
    next(e)
  })

});



module.exports = router;
