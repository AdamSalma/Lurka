import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from 'config';
import paths from 'config/paths';
import createLoaders from './loaders';
import aliases from './aliases';
import vendors from './vendors';


module.exports = {
    entry: {
        app: config.paths.app_entry
        // vendor: vendors
    },
    output: {
        path: config.paths.build,
        filename: '[name].bundle.js'
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        alias: aliases,
        modules: ['node_modules', config.paths.app_modules]  // Because of split package.json
    },
    module: { loaders: createLoaders("production") },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            sourceMap: true,
            compress: {
              screw_ie8: true, // React doesn't support IE8
              warnings: false,
              unused: true,
              dead_code: true,
            },
            mangle: {
              screw_ie8: true,
            },
            output: {
              comments: false,
              screw_ie8: true,
            },
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: paths.app_html,
            filename: 'main.html',
            chunksSortMode: "dependency",
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new HtmlWebpackPlugin({
            template: paths.app_preloader,
            filename: 'preloader.html',
            inject: false,
        })
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
