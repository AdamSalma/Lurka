import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../../config/webpack.dev.js';

const webpackCompiler = webpack(webpackConfig);

// enable webpack middleware for hot-reloads in development
export default function useWebpackMiddleware(app) {

    log.app("Bundling client code...")
    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false,
            'errors-only': true
        }
    }));

    return app;
}
