import express from 'express';
import config from '../config';
import webpackHotMiddleware from './middleware/webpackMiddleware';

var app = express();
var router = express.Router();

const ROOT = global.root = require('path').join(__dirname, '../dist');


// Environment
console.info(`Environment: "${config.env}"`);
if (config.env !== 'production') 
    webpackHotMiddleware(app);
else 
    app.use(express.static(ROOT));
// app.use(favicon(path.join(ROOT, '/assets/favicon.ico')))


// Print url for debugging:
app.all('*', (req) => console.info("User request:", req.url));


// Routes
app.use('/', require('./routes/dashboard'))
app.use('/4chan', require('./routes/4chan'));


// 404 handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Print stacktrace
app.use( err => {
    console.error(err.message);
    res.send(err)
});


export default app;
