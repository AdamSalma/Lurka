const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ConsoleClearPlugin = require('../ConsoleClearPlugin');

const config  = require('config');
const loaders = require('../loaders');
const aliases = require('../aliases');
const vendors = require('../vendors');


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
        modules: ['node_modules', config.paths.app_modules/*, config.paths.app*/]
    },
    module: { loaders },
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: config.paths.app_html,
            inject: false
        }),
        new ConsoleClearPlugin() // custom plugin to clear the console before each bundle
    ]
};
