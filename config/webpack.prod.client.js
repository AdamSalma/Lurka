var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var autoprefixer = require('autoprefixer');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outpath = path.join(__dirname, "..", "app")
var node_modules = path.join(outpath, "node_modules")

module.exports = {
	target: "electron",
	entry: {
        app: `./src/client/index.jsx`
	},
	output: {
		path: outpath,
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass', '.json'],
		root: node_modules
	},
	module: {
		loaders: loaders
	},
	plugins: [
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
            template: path.join(__dirname, '..', 'src', 'index.html')
        })
	],
	postcss: function () {
        return [autoprefixer];
    }
};
