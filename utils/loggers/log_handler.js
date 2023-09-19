const winston=require('winston')
require('winston-daily-rotate-file')
const {Logger ,transports}=winston
const{Console,DailyRotateFile}=transports
const logger =new(Logger)({
  transports:[
    new Console(),
    new DailyRotateFile({
      name: 'base_logger',
      filename: 'logs/info.log.',
      datePattern: 'yyyy_MM_dd',
      prepend: false,
      level: 'info',
    }),
    new DailyRotateFile({
      name: 'error_logger',
      filename: 'logs/error.log.',
      datePattern: 'yyyy_MM_dd',
      prepend: false,
      level: 'error',
    })
  ]
})
module.exports =logger