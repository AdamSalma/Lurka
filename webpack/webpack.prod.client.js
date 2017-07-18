var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var loaders = require('./webpack.loaders');

var UI = path.join(__dirname, "..", "src", "UI")
var app = path.join(__dirname, "..", "app")
var node_modules = path.join(app, "node_modules")

module.exports = {
    // target: "electron",
    entry: {
        app: path.join(UI, 'index.jsx')
    },
    output: {
        path: app,
        filename: '[name].bundle.js',
        publicPath: require('../config').server.url
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        alias: require("./webpack.alias"),
        modules: ['node_modules', node_modules, UI]
    },
    module: { loaders: loaders },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            sourceMap: true,
            compress: {
              screw_ie8: true, // React doesn't support IE8
              warnings: isVerbose,
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
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(UI, 'index.html')
        })
    ]
};
