const NoAuthError = require('../errors/no_auth')
const JWTConfig=require('../cipher/jwt_config')
const JWT = require('jsonwebtoken')

module.exports = (options) => {
  return (req, res, next) => {
    (async () => {
      const authorization = req.get('Authorization')
      if (!authorization || authorization.indexOf('Bearer') === -1){
        throw new NoAuthError(null)
      }

      const token = authorization.split(' ')[1]
      console.log(authorization)
      console.log(token,'tokentoken')
      if (!token) {throw new NoAuthError(null)}
      let user
      try {
        user = JWT.verify(token,JWTConfig.SECRET)
        console.log(JWT.verify(token,JWTConfig.SECRET),'useruser')
      } catch (e) {
        throw  new NoAuthError(token)
      }
      req.user = user

    })().then(() => {
      next()
    }).catch((e) => { next(e)})
  }
}

