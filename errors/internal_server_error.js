const http_base_error=require('./http_base_error')
const ERROR_COED=500000
class Internal_server_error extends http_base_error {
  constructor(msg) {
    super(500,'服务器出错了',ERROR_COED,
      `something went wrong${msg}`)
  }
}

module.exports = Internal_server_error