const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import ConsoleClearPlugin from '../ConsoleClearPlugin';
import ManifestPlugin from 'webpack-manifest-plugin';

import config from 'config';
import loaders from '../loaders';
import aliases from '../aliases';
import vendors from '../vendors';


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
            inject: false,
            chunksSortMode: "dependency",
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
        new ManifestPlugin({
          fileName: 'asset-manifest.json',
        }),
        // Custom plugin to clear the console before each bundle
        new ConsoleClearPlugin()
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
