import express from 'express';
import config from '../config';

import webpackHotMiddleware from './middleware/webpackMiddleware';

var app = express();
var router = express.Router();

const ROOT = require('path').join(__dirname, '../dist');
const ENV = process.env.NODE_ENV
const DEBUG = config.env !== 'production';


// If DEV mode, use webpack hot reloading
if (DEBUG) {
    console.info('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    webpackHotMiddleware(app);
} else {
    console.log('PRODUCTION ENVIRONMENT');
    app.use(express.static(ROOT));
    // TODO - Uncomment this when ready:
    // app.use(favicon(path.join(__dirname, '../dist/imgs', 'favicon.ico')));
}


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
