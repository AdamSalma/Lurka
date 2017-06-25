import Express from 'express'
import { join } from 'path';

import config from '-/config'
import routes from './routes'
import rootRequire from './services/rootRequire'
import routeLogger from './middleware/routeLogger'
import checkInternet from './middleware/checkInternet'
import webpackHotMiddleware from './middleware/webpackMiddleware'

// clientRoot is used to locate ../index.html in production/development env's
global.clientRoot = config.env.production ? __dirname : join(__dirname, '..');
global.rootRequire = rootRequire;

const app = Express();

app.use(checkInternet);

log.app(`Environment: "${config.env}"`);

// Setup static file paths
if (config.env.production) {
    // Use the current folder (for webpack bundled icons)
    app.use(Express.static(__dirname));
    app.use(Express.static(join(__dirname, 'public')));
} else {
    app.use(Express.static(join(__dirname, 'public')));
    // Use webpack; production version is bundled already
    webpackHotMiddleware(app);
}

// Proxy media queries through server to set headers
// (4chan blocks if you request media with localhost)
app.use('/proxy', routes.proxy);

app.all('*', routeLogger);
app.use('/', routes.index);
app.use('/api', routes.api);

// Eventually...
// app.use('/user', require('./routes/user'));  // Save/Load user archives
// app.use('/settings', require('./routes/settings'));  // Save/Load setting related files (config, stylesheets?)

// 404 handler
app.use(({ url }, res, next) => {
    // Ignore HMR
    if (url.includes("webpack")) {
        return next();
    }

    log.error(`404 Not found: ${url}`);
    res.status(404);
    res.send(new Error(`Not found: ${url}`));
});

// Handler for other errors
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    log.error(err.stack);
    res.status(err.status || 500);
    res.send(err.message);
});


export default app;
