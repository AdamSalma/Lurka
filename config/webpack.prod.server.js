var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var path = require('path').join(__dirname, '../app/');
var fs = require('fs');

// excludes some node_modules files from bundle to avoid errors (esp with Express)
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
        server: `./server/index.js`
	},
	output: {
		path: path,
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map'
	},
	resolve: {
		extensions: ['', '.js', '.json']
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
};
