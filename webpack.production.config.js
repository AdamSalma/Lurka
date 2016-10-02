var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path').join(__dirname, 'dist');
var fs = require('fs');

// used when compiling server side code
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
	target: "node",
	externals: nodeModules,
	entry: {
        // app: `./client/index.jsx`
        server: `./server/index.js`
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
		new CopyWebpackPlugin([
			{from: './client/index.html'}
		]),
		// new webpack.ProvidePlugin({
		// 	$: "jquery",
		// 	jQuery: "jquery",
		// 	"window.jQuery": "jquery"
		// }),
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
