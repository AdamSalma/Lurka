import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from 'config/paths';
import aliases from '../aliases';
import vendors from '../vendors';
import createLoaders from '../loaders';


const config = {
    target: "electron-main",
    entry: paths.electron_entry,
    output: {
        path: paths.build,
        filename: 'electron.bundle.js',
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass', '.json'], // .json for babel package.json
        alias: aliases,
        modules: ['node_modules', paths.app_modules]
    },
    node: {
      __dirname: false
    },
    module: { loaders: createLoaders("production") },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     warnings: false,
        //     sourceMap: true,
        //     compress: {
        //       screw_ie8: true, // React doesn't support IE8
        //       warnings: false,
        //       unused: true,
        //       dead_code: true
        //     },
        //     mangle: {
        //       screw_ie8: true
        //     },
        //     output: {
        //       comments: false,
        //       screw_ie8: true
        //     }
        // }),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};

// config.target = webpackTargetElectronRenderer(config);

module.exports = module.exports.default = config
