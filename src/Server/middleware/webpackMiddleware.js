import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '-/webpack/webpack.dev.js';

const webpackCompiler = webpack(config);

// enable webpack middleware for hot-reloads in development
export default function useWebpackMiddleware(app) {

    log.app("Bundling client code...")
    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            chunks: false,
            'errors-only': true
        }
    }));

    app.use(webpackHotMiddleware(webpackCompiler));

    return app;
}
