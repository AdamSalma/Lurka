import Express from 'express'
import config from '../../config'
import webpackHotMiddleware from './middleware/webpackMiddleware'
import logRequests from './middleware/logRequests'
import { join } from 'path';
 
const app = Express();
const isProd = config.env === 'production'


// Used to send index.html
global.app_root = isProd ? __dirname : join(__dirname, '../..', 'app')

 
console.info(`Environment: "${config.env}"`);
if (isProd) {
    app.use(Express.static(__dirname));
    app.use(Express.static(join(__dirname, 'assets')));
} else {
    app.use(Express.static(join(__dirname, '..', 'assets')));
    webpackHotMiddleware(app);
}
 
 
// Routes
app.all('*', logRequests);
app.use('/', require('./routes/dashboard'));  // index.html, (validation?)
app.use('/provider', require('./routes/provider'));  // Request content from external API

// Eventually...
// app.use('/user', require('./routes/user'));  // Save/Load user archives
// app.use('/settings', require('./routes/settings'));  // Save/Load setting related files (config, stylesheets?)


export default app;