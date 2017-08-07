var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var config = require('../../config');
var path = require('path');
var fs = require('fs');

var root = path.join(__dirname, '../..');
var app = path.join(root, "app")
var node_modules = path.join(app, "node_modules")

// excludes some node_modules files from bundle to avoid errors (esp with Express)
var modules = {};
fs.readdirSync(node_modules).filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
    modules[mod] = 'commonjs ' + mod;
});

module.exports = {
    target: "node",
    node: {
        __dirname: false
    },
    externals: modules,
    entry: `./src/server/`,
    output: {
        path: app,
        filename: 'server.bundle.js',
        publicPath: config.server.url,
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [node_modules, 'node_modules']
    },
    module: {
        loaders: loaders
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            warnings: false,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
