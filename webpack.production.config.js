var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
        `./client/index.jsx`
    ],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', 'css', 'scss', 'sass']
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: { screw_ie8 : true, keep_fnames: true },
			compress: { screw_ie8: true },
			comments: false
	    }),
		new CopyWebpackPlugin([
			{from: './client/index.html'}
		])
	],
	postcss: function () {
        return [autoprefixer];
    }
};
