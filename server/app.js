import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import config from '../config';

import {
  webpackMiddleware,
  webpackHotMiddleware
} from './middleware/webpackMiddleware';

var app = express();
var router = express.Router();

const ROOT = require('path').join(__dirname, '../dist');
const ENV = process.env.NODE_ENV
const DEBUG = config.env !== 'production';


// If ENV is development, use webpack hot reloading
if (DEBUG) {
    console.info('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    app.use(webpackMiddleware);
    app.use(webpackHotMiddleware);
}

app.use(compression());
app.use(express.static(ROOT));
app.use(morgan(DEBUG ? 'dev' : 'combined'));

app.all('*', function(req, res, next){
    console.info("Request to:", req.url);
    next();
});

app.use('/4chan', require('./routes/4chan'));

app.use('/', function(req, res, next) {
  res.sendFile('index.html', { root: ROOT });
  res.end();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export default app;
