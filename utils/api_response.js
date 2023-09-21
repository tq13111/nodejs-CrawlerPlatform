
const logger = require('../utils/loggers/log_handler');

module.exports=(req,res)=>{
  if (res.headersSent) {
    logger.error(
      'error sending response: header already sent',
      { url: req.originalUrl },
    );
  }else{
    return res.json({
      code:0,
      data:res.data
    })
  }
}