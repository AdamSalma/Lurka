var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var autoprefixer = require('autoprefixer');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var src = path.join(__dirname, "..", "src")
var app = path.join(__dirname, "..", "app")
var node_modules = path.join(app, "node_modules")

module.exports = {
	target: "electron",
	entry: {
        app: path.join(src, 'index.jsx')
	},
	output: {
		path: app,
		filename: '[name].bundle.js',
		publicPath: require('../config').server.url,
		sourceMapFilename: '[name].bundle.map'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass', '.json'],
		root: node_modules,
		alias: require("./webpack.alias")
	},
	module: {
		loaders: loaders
	},
	plugins: [
        new webpack.optimize.UglifyJsPlugin({
        	sourceMap: false,
    		warnings: false,
        }),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new HtmlWebpackPlugin({
            template: path.join(src, 'index.html')
        })
	],
	postcss: function () {
        return [autoprefixer, require('postcss-nested')];
    }
};
