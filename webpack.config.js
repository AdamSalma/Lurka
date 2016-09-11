import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import loaders from './webpack.loaders';
import config from './config';

const HOST = config.server.host
const PORT = config.server.port

export default {
	entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server',
		`./client/index.jsx`
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
        path: "/",
        publicPath: "http://" +HOST+ ":" +PORT+ "/",
		filename: 'app.bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass']
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
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new CopyWebpackPlugin([
			{from: './client/index.html'}
		])
	]
};
