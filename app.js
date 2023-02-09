/*
Name: Jin Huang
Student ID: 301020707
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//setting up requirements for routes
//imports content from the routes folder
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

//creates instance of the express framework
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // creates a path in the view directory for ejs tempalte
app.set('view engine', 'ejs');// sets view engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use('/', indexRouter); // sets up index router as default (root)
app.use('/users', usersRouter);// sets up user router to handle requests

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
