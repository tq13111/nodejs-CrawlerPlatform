var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./services/mongodb_connection')
var app = express();

require('./services/mongodb_connection')
const errorhandler = require('./middlewares/error_handler')
const apiIndex = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api', apiIndex);
app.use(errorhandler());

process.on('uncaughtException',(err)=>{

})
process.on( 'unhandledReject ',(reason,p)=>{

})

module.exports = app;
