var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var session = require("express-session")
var sessionConfig = require("./session/sessionConfig")

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var registerRouter = require('./routes/registration');
var shippingRouter = require('./routes/shipping');
var calculatorRouter = require('./routes/calculator');
var billRouter = require('./routes/billing');
var notificationsRouter = require('./routes/notifications');
var employeeRouter = require('./routes/employee-registration');
var packageRouter = require('./routes/package');
var adminToolsRouter = require('./routes/adminTools');
var transaction_tableRouter = require('./routes/transaction-table');
var transaction_creationRouter = require('./routes/transaction-creation');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/adminTools',adminToolsRouter);

app.use(session( sessionConfig.SESSION_CONFIG ))

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/register', registerRouter);
app.use('/shipping', shippingRouter);
app.use('/calculator', calculatorRouter);
app.use('/billing', billRouter);
app.use('/notifications', notificationsRouter);
app.use('/employee-register',employeeRouter);
app.use('/package',packageRouter);
app.use('/adminTools', adminToolsRouter);
app.use('/transaction-table',transaction_tableRouter);
app.use('/transaction',transaction_creationRouter);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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
