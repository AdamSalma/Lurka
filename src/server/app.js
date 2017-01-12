import Express from 'express'
import errorHandler from 'errorhandler'
import notifier from 'node-notifier'
import { join } from 'path';

import routes from './routes'
import config from '../../config'
import webpackHotMiddleware from './middleware/webpackMiddleware'

const app = Express();
const isProd = config.env === 'production'

// Used to send index.html
global.app_root = isProd ? __dirname : join(__dirname, '../..', 'app')

log.app(`Environment: "${config.env}"`);
if (isProd) {
    app.use(Express.static(__dirname));
    app.use(Express.static(join(__dirname, 'assets')));
} else {
    app.use(Express.static(join(__dirname, '..', 'assets')));
    webpackHotMiddleware(app);
}
 

// Proxy
app.use('/media', routes.media);  // Proxy media queries through server to set headers

// Routes
app.all('*', ({ url }, res, next)=>{ log.http(url); next() });  // log route
app.use('/', routes.index);  // index.html, (validation?)
app.use('/api', routes.api);  // Request content from external API

// Eventually...
// app.use('/user', require('./routes/user'));  // Save/Load user archives
// app.use('/settings', require('./routes/settings'));  // Save/Load setting related files (config, stylesheets?)

// 404 handler
app.use(({ url }, res, next) => {
    // Ignore HMR
    if (url.includes("webpack")) 
        return next()

    if (isProd) {
        log.error(`404 Not found: ${url}`)
        res.status(404);
    } else {
        log.error(`Not found: ${url}`);
        res.send(new Error(`Not found: ${url}`))
    }
});
 
// Error handler
if (isProd) {
    app.use((err, str, req) => {
        log.error(`Error in ${req.method} ${req.url}`)
    })
} else {
    app.use(errorHandler({log: errorNotification}))
}
 
function errorNotification(err, str, req) {
    const title = `Error in ${req.method} ${req.url}`
 
    notifier.notify({
        title: title,
        message: str
    })
}

export default app;
