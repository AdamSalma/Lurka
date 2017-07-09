import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import loaders from './webpack.loaders';
import config from '../config';
import alias from './webpack.alias'

const UI = path.join(__dirname, "..", "src", "UI")
const app = path.join(__dirname, "..", "app")
const node_modules = path.join(app, "node_modules")

export default {
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server',
        path.join(UI, 'index.jsx')
    ],
    output: {
        path: '/',
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(UI, 'index.html')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
