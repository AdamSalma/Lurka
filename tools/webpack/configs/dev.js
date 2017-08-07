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
        path: "/",
        publicPath: config.server.url,
        filename: '[name].bundle.js',
        pathinfo: true
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        alias: aliases,
        modules: ['node_modules', config.paths.app_modules, config.paths.app]
    },
    module: { loaders },
    devServer: {
        contentBase: config.paths.build,
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
            template: config.paths.app_html,
            inject: false
        }),
        new ConsoleClearPlugin() // custom plugin to clear the console before each bundle
    ]
};
