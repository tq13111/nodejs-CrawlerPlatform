const http_base_error=require('./http_base_error')
const ERROR_COED=400000
class http_request_param_error extends http_base_error {
  constructor(paramName,desc,msg) {
    super(200,desc,ERROR_COED,`${paramName} wrong: ${msg}`)
  }
}

module.exports = http_request_param_error