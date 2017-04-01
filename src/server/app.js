import Express from 'express'
import { join } from 'path';

import routes from './routes'
import config from '../config'

import webpackHotMiddleware from './middleware/webpackMiddleware'
import routeLogger from './middleware/routeLogger'
import checkInternet from './middleware/checkInternet'
import rootRequire from './services/rootRequire'


// app_root is used to locate ../index.html in production/development env's
global.app_root = config.prodEnv ? __dirname : join(__dirname, '..')
global.rootRequire = rootRequire

const app = Express();

log.app(`Environment: "${config.env}"`);
if (config.prodEnv) {
    app.use(Express.static(__dirname));
    app.use(Express.static(join(__dirname, 'public')));
} else {
    app.use(Express.static(join(__dirname, '../..', 'public')));
    webpackHotMiddleware(app);
}
 
app.use(checkInternet);

// Proxy
app.use('/proxy', routes.proxy);  // Proxy media queries through server to set headers

// Routes
app.all('*', routeLogger);  // log route
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

    if (config.prodEnv) {
        log.error(`404 Not found: ${url}`)
        res.status(404);
    } else {
        log.error(`Not found: ${url}`);
        res.status(404);
        res.send(new Error(`Not found: ${url}`))
    }
});

// Handler for other errors
app.use((err, req, res, next) => {
    if (res.headersSent)
        return next(err)

    log.error(err.stack);
    res.status(err.status || 500)
    res.send(err.message)

})
 

export default app;
