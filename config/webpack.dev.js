import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
 
import loaders from './webpack.loaders';
import config from '.';
 
const HOST = config.server.host
const PORT = config.server.port

const outpath = path.join(__dirname, "..", "app")
const node_modules = path.join(outpath, "node_modules")

export default {
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server',
        `./src/client/index.jsx`
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'eval',
    output: {
        path: "/",
        publicPath: "http://" +HOST+ ":" +PORT+ "/",
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass'],
        root: node_modules
    },
    module: {
        loaders
    },
    devServer: {
        contentBase: "./dist",
            noInfo: false, //  --no-info option
            hot: true,
            inline: true,
            port: PORT,
            host: HOST
        },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    postcss: function () {
        return [autoprefixer];
    }
};