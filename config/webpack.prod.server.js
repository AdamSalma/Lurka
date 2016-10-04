var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var path = require('path')
var fs = require('fs');

var outpath = path.join(__dirname, "..", "app")
var node_modules = path.join(outpath, "node_modules")

// excludes some node_modules files from bundle to avoid errors (esp with Express)
var modules = {};
fs.readdirSync(node_modules).filter(function(x) {
  	return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
   	modules[mod] = 'commonjs ' + mod;
});

module.exports = {
	target: "node",
	externals: modules,
	entry: {
        server: `./src/server/index.js`
	},
	output: {
		path: outpath,
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map'
	},
	resolve: {
		extensions: ['', '.js', '.json'],
		root: node_modules
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
