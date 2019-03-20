const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const UserModel = require('./models/event');

//----------------------------------------

// UserModel.create({ name: 'Alex', surname: 'Nik' }, (err) => {
//   if (err) console.log(err);
// });

// UserModel.updateOne({ name: 'Sam', surname: 'Black' }, (err) => {
//   if (err) console.log(err);
// });

// UserModel.deleteOne({ name: 'Sam' }, (err) => {
//   if (err) console.log(err);
// });

// UserModel.find().then((doc) => {
//   console.log('!!!!', doc);
// });

// const User = new UserModel({ name: 'Alexander', surname: 'Nikolyuk' });
// console.log(`Name of this user ${User.name} and surname ${User.surname}`);

// UserModel.virtual('fullName').get(function () {
//   return `${this.name}  ${this.surname}`;
// });
// console.log(User.fullName);


//----------------------------------------

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const formRouter = require('./routes/form');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }

  next(createError(503));
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form', formRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    logger.warn('Routes already enabled');
    return;
  }

  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;
