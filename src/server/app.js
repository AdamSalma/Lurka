import Express from 'express'
import config from '../../config'
import webpackHotMiddleware from './middleware/webpackMiddleware'
import { join } from 'path';
 
const app = Express();
const router = Express.Router();

 
// Environment config
console.info(`Environment: "${config.env}"`);
if (config.env === 'production') {
    // Bundled production code is placed in the app directory
    global.app_root = __dirname  
    app.use(Express.static(__dirname));
    app.use(Express.static(join(__dirname, 'assets')));
} else {
    // Used to send index.html
    global.app_root = join(__dirname, '../..', 'app');
    // Static assets - mainly for favicon because its cool
    app.use(Express.static(join(__dirname, '..', 'assets')));
    webpackHotMiddleware(app);
    // Log requested url
    app.all('*', (req, res, next) => {
        console.info("User request:", req.url);
        next()
    });
}
 
 
// Routes
app.use('/', require('./routes/dashboard'));  // index.html, (validation?)
app.use('/provider', require('./routes/provider'));  // Request content from external API

// Eventually...
// app.use('/user', require('./routes/user'));  // Save/Load user archives
// app.use('/settings', require('./routes/settings'));  // Save/Load setting related files (config, stylesheets?)


export default app;