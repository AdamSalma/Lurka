module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader: 'babel',
	},
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss', 'sass']
    },
    {
        test: /\.sass$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss', 'sass']
    },
	{
		test: /\.css$/,
		exclude: /node_modules/,
		loaders: ['style', 'css']
	},
	{
		test: /\.json$/,
		loader: 'json'
	},
	{
    	test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
    	loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
	}
];
