"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

if (!process.env.HOST) require('./env');
const HOST = process.env.HOST
const PORT = process.env.PORT

module.exports = {
	entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server',
		`./src/index.jsx`
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
        path: "/",
        publicPath: "http://" +HOST+ ":" +PORT+ "/",
		filename: 'app.bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', 'css', 'scss', 'sass']
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
		new CopyWebpackPlugin([
			{from: './src/index.html'}
		]),
	]
};
