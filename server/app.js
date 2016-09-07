import express from 'express';
import config from '../config';
import webpackHotMiddleware from './middleware/webpackMiddleware';

var app = express();
var router = express.Router();

const ROOT = require('path').join(__dirname, '../dist');
const isDevelopment = config.env !== 'production';


if (isDevelopment) {
    // use webpack hot reloading
    console.info('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    webpackHotMiddleware(app);
} else {
    console.log('PRODUCTION ENVIRONMENT');
    app.use(express.static(ROOT));
    // TODO - Uncomment this when ready:
    // app.use(favicon(path.join(__dirname, '../dist/imgs', 'favicon.ico')));
}

// Print url for debugging purposes
app.all('*', (req, res, next) => {
    console.info("User request:", req.url);
    next();
});

app.use('/4chan', require('./routes/4chan'));

app.use('/', (req, res, next) => {
    res.sendFile('index.html', { root: ROOT });
    res.end();
});




// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// prints stacktrace

app.use((err, req, res, next) => {
    console.log(err.message);
    res.send(err)
});

export default app;
