const logger=require('../utils/loggers/log_handler')
const HTTPBaseError = require('../errors/http_base_error')
 function errorhandler(options) {
   return function (err, req, res, next) {
    if (err instanceof HTTPBaseError) {
      logger.error(err.message,{
        query:req.url,
        req:req.originalUrl,
        userInfo:req.user,
      })
      res.statusCode = err.httpStatusCode
      res.json(err)

    } else {
        next(err);
      }
  }
}
module.exports = errorhandler;