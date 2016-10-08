import Express from 'express'
import config from '../../config'
import webpackHotMiddleware from './middleware/webpackMiddleware'
import { join } from 'path';
 
const app = Express();
const router = Express.Router();

 
// Environment
console.info(`Environment: "${config.env}"`);
if (config.env === 'production') {
    global.app_root = __dirname
    app.use(Express.static(global.app_root));
} else {
    // Development
    global.app_root = join(__dirname, '../..', 'app');
    webpackHotMiddleware(app);
    app.all('*', (req, res, next) => {
        console.info("User request:", req.url);
        next()
    });
}
 
 
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