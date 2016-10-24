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
		test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, 
		loader: 'url-loader?limit=100000&name=[name]-[hash].[ext]' 
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
