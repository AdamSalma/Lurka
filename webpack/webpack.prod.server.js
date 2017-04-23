var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var path = require('path');
var fs = require('fs');

var outpath = path.join(__dirname, "..", "app");
var node_modules = path.join(outpath, "node_modules");

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
        path: outpath,
        filename: 'server.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        root: node_modules
    },
    module: {
        loaders: loaders
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
