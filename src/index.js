// index.js
const createError = require('http-errors');
const bodyParser = require('body-parser');

/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || '3001';

/**
 *  App Configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
 * Routes Definitions
 */
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
