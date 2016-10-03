var serverPath = require('path').join(__dirname, 'server')

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
		loader: 'style-loader!css-loader'
	},
	{
		test: /\.json$/,
		loader: 'json'
	},
	{
		test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/font-woff"
    }, 
    {
		test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/font-woff"
    }, 
    {
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
    }, 
    {
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: "file"
    }, 
    {
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
    },
	{
		test: /\.gif/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	},
	{ 
		test: serverPath, 
		exclude: /node_modules/,		
		loader: 'babel'
	}
];
