var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

export default {
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
		new CopyWebpackPlugin([
			{from: './client/index.html'}
		]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]
};
