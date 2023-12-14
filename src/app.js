var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { MongoClient } = require('mongodb');

const HOST = process.env.DB_HOST;
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

// Connect to the db
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// Connect to the MongoDB cluster
(async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    exit(1);
  }
})();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var greetRouter = require('./routes/greet');
const { exit } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.dbClient = client;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/greet', greetRouter);

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
  res.render('error');
});

module.exports = app;
