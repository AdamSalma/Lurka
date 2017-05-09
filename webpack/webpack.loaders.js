module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader: 'babel',
	},
    {
        test: /\.sass|scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap']
    },
	{
		test: /\.css$/,
		loaders: ['style', 'css?sourceMap']
	},
	{
		test: /\.json$/,
		loader: 'json'
	},
	{
		test: /.(png|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
		loader: 'url-loader?limit=100000&name=[name].[ext]'
	},
	{
		test: /\.(md|ejs)$/,
		loader: 'ignore-loader'
	},
	{
		test: /\LICENSE$/,
		loader: 'ignore-loader'
	}
];
