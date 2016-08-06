"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "9999";

module.exports = {
	entry: [
		`webpack-dev-server/client?http://${HOST}:${PORT}`, // WebpackDevServer host and port
		`webpack/hot/only-dev-server`,
		`./src/index.jsx`
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'dist'),
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
