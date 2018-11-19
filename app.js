var createError = require('http-errors')
var express = require('express') //express module
var path = require('path')
var bodyParser = require("body-parser") //express body parser module
var cookieParser = require('cookie-parser') //cookie parser module
var db = require('./configs/database') //database connection setup
const expressValidator = require('express-validator') //express validator for validtion


/** creating express app */
var app = express();


/** view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/** view engine setup end */


/** setup body parsers */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
/** setup body parsers end*/

/** register express validator */
app.use(expressValidator());


/** enable access to public folder through browser */
app.use(express.static(path.join(__dirname, 'public')));



/** registering routes */
var indexRouter = require('./routes/index'); //index routes
var shopRouter = require('./routes/shop') //shop api routes
var userRouter = require('./routes/user') //user api routes
app.use('/', indexRouter);
app.use('/api/v1/shops', shopRouter);
app.use('/api/v1/users', userRouter)
/** registering routes end*/




/** catch 404 and forward to error handler */
app.use(function (req, res, next) {
  next(createError(404));
});


/** registering default error handler */
app.use(require('./helpers/errorHandler'));


/** exporting whole express app module */
module.exports = app;
