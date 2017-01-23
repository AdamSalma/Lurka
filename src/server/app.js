import Express from 'express'
import { join } from 'path';

import routes from './routes'
import config from '../../config'
import webpackHotMiddleware from './middleware/webpackMiddleware'
import routeLogger from './middleware/routeLogger'

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

    if (isProd) {
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
