import webpack from 'webpack';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import ConsoleClearPlugin from './ConsoleClearPlugin';

import config  from 'config';
import paths from 'config/paths';
import createLoaders from './loaders';
import aliases from './aliases';
import vendors from './vendors';


module.exports = {
    entry: {
        app: config.paths.app_entry
        // vendor: vendors
    },
    output: {
        path: "/",
        pathinfo: true,
        publicPath: config.server.url,
        filename: '[name].bundle.js',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info => {
            const location = path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
            // return location // if you want the full path
            const split = location.split('/')
            return split.slice(split.length-2, split.length).join('/')
        }
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        alias: aliases,
        modules: ['node_modules', config.paths.app_modules, config.paths.app]
    },
    module: { loaders: createLoaders("development") },
    devServer: {
        contentBase: config.paths.build,
        noInfo: false,
        hot: true,
        overlay: true,
        inline: true,
        port: config.server.port,
        host: config.server.host,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        stats: { maxModules: 0 }, // disable modules
    },
    plugins: [
        new WebpackBuildNotifierPlugin(),
        new webpack.NamedModulesPlugin(),
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
            template: paths.app_html,
            inject: 'body'
        }),
        new ConsoleClearPlugin() // custom plugin to clear the console before each bundle
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
};
