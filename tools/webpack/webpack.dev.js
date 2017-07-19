const webpack = require('webpack')
const path = require('path')

const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const ConsoleClearPlugin = require('./ConsoleClearPlugin');

const config = require('../../config')
const loaders = require('./webpack.loaders')
const alias = require('./webpack.alias')
const vendors = require('./vendors')

const root = path.join(__dirname, "..", "..");
const UI = path.join(root, "src", "UI");
const app = path.join(root, "app");
const node_modules = path.join(app, "node_modules");

module.exports = {
    entry: {
        app: path.join(UI, 'index.jsx'),
        // vendor: vendors
    },
    output: {
        path: "/",
        publicPath: config.server.url,
        filename: '[name].bundle.js',
        pathinfo: true
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        alias: alias,
        modules: ['node_modules', node_modules, UI]
    },
    module: { loaders },
    devServer: {
        contentBase: app,
        noInfo: false,
        hot: true,
        overlay: true,
        inline: true,
        port: config.server.port,
        host: config.server.host,
        stats: {maxModules: 0} // disable modules
    },
    plugins: [
        new WebpackBuildNotifierPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     minChunks: Infinity,
        //     children: true,
        // }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // uses 'development' unless process.env.NODE_ENV is defined
            DEBUG: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: path.join(UI, 'index.html')
        }),
        new ConsoleClearPlugin()
    ]
};
