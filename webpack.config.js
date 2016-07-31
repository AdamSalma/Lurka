// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
    title: 'MemeScape',
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    ENV: ENV
};
/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use 'eval'
    devtool: 'source-map',
    debug: true,

    entry: {
        app: root('src/index.ts'),
        'vendor': root('src/vendor.ts')
    },

    // Config for build files
    output: {
        path: root('./dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: rootNode('tslint-loader'),
            exclude: [/node_modules/]}],
        loaders: [
            // if you add a loader include the resolve file extension above
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            {
                test: /\.sass$/,
                exclude: /node_modules/,
                loader: 'raw-loader!sass-loader'
            },
            // { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            {test: /.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2)(\?.+)?$/, loader: 'url?limit=50000'}
            // { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        ]
    },

    plugins: [
        new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
        // generating html
        new HtmlWebpackPlugin({ template: root('src/index.html') }),
        // replace
        new DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],

    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    // we need this due to problems with es6-shim
    node: { global: 'window', progress: true, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}
