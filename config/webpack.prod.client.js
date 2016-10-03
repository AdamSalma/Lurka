var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var autoprefixer = require('autoprefixer');
var path = require('path').join(__dirname, '../app/');

module.exports = {
	target: "electron",
	entry: {
        app: `./client/index.jsx`
	},
	output: {
		path: path,
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass', '.json']
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
		})
	],
	postcss: function () {
        return [autoprefixer];
    }
};
