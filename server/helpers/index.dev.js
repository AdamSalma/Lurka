var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../../webpack.config.js')
var webpackCompiler = webpack(webpackConfig);

//enable webpack middleware for hot-reloads in development
function useWebpackMiddleware(app) {
    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false,
            'errors-only': true
        }
    }));
    app.use(webpackHotMiddleware(webpackCompiler, {
        log: console.log
    }));

    return app;
}

module.exports = {
    useWebpackMiddleware: useWebpackMiddleware
};
