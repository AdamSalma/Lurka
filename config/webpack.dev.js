import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import loaders from './webpack.loaders';
import config from '.';
import alias from './webpack.alias'

const HOST = config.server.host
const PORT = config.server.port

const src = path.join(__dirname, "..", "src")
const app = path.join(__dirname, "..", "app")
const node_modules = path.join(app, "node_modules")


export default {
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server',
        path.join(src, 'client', 'index.jsx')
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'inline-source-map',
    output: {
        path: '/',
        publicPath: `http://${HOST}:${PORT}/`,
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass'],
        root: node_modules,
        alias: alias
    },
    module: { loaders },
    devServer: {
        contentBase: app,
        noInfo: false, //  --no-info option
        hot: true,
        inline: true,
        port: PORT,
        host: HOST
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(src, 'index.html')
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
    ],
    postcss: function () {
        return [autoprefixer, require('postcss-nested')];
    }
};
