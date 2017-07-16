const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const loaders = require('./webpack.loaders')
const config = require('../config')
const alias = require('./webpack.alias')

const UI = path.join(__dirname, "..", "src", "UI")
const app = path.join(__dirname, "..", "app")
const node_modules = path.join(app, "node_modules")

module.exports = {
    entry: [
        `webpack-hot-middleware/client?path=${config.server.url}__webpack_hmr`,
        // 'webpack/hot/dev-server',
        path.join(UI, 'index.jsx')
    ],
    output: {
        path: "/",
        publicPath: config.server.url,
        filename: 'app.bundle.js',
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
        inline: true,
        port: config.server.port,
        host: config.server.host
    },
    plugins: [
        new WebpackBuildNotifierPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: path.join(UI, 'index.html')
        }),
    ]
};
