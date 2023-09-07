
const HTTPBaseError = require('../errors/http_base_error')
 function errorhandler(options) {
   return function (err, req, res, next) {
    if (err instanceof HTTPBaseError) {
      throw new Error('123')
      res.statusCode = err.httpStatusCode
      res.json(err)

    } else {
        next(err);
      }
  }
}
module.exports = errorhandler;