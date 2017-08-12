const webpack = require('webpack');

const config  = require('config');
const loaders = require('../loaders');
const aliases = require('../aliases');
const vendors = require('../vendors');


module.exports = {
    target: 'electron-main',
    entry: config.paths.electron_entry,
    output: {
        path: config.paths.build,
        filename: 'electron.bundle.js',
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass', '.json'], // .json for babel package.json
        alias: aliases,
        modules: ['node_modules', config.paths.app_modules]
    },
    module: { loaders },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     warnings: false,
        //     sourceMap: true,
        //     compress: {
        //       screw_ie8: true, // React doesn't support IE8
        //       warnings: false,
        //       unused: true,
        //       dead_code: true
        //     },
        //     mangle: {
        //       screw_ie8: true
        //     },
        //     output: {
        //       comments: false,
        //       screw_ie8: true
        //     }
        // }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
