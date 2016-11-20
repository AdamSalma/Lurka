import Express from 'express'
import routes from './routes'
import config from '../../config'
import webpackHotMiddleware from './middleware/webpackMiddleware'
import { join } from 'path';

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
    if (url.includes("__webpack")) {
        return next()
    }
    if (isProd) {
        log.error(`404 Not found: ${url}`)
        res.status(404);
    } else {
        var err = new Error('Not Found');
        log.error(err.message);
        res.send(err)
    }
});


export default app;