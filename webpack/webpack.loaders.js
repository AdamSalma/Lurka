module.exports = createLoaders((loaders) => [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: loaders.babel,
    },
    {
        test: /\.sass|scss$/,
        exclude: /node_modules/,
        use: loaders.sass
    },
    {
        test: /\.css$/,
        use: loaders.css
    },
    {
        test: /.(png|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        use: loaders.url
    },
    {
        test: /\.(md|ejs)$/,
        use: loaders.ignore
    },
    {
        test: /\LICENSE$/,
        use: loaders.ignore
    }
])

function createLoaders(callback) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: true
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            config: require('path').join(__dirname, '../config'),
            plugins: (loader) => [require('autoprefixer')()]
        }
    }

    const sassLoader = {
        loader: 'sass-loader',
        options: { sourceMap: true }
    }

    const styleLoader = {
        loader: 'style-loader',
        options: { sourceMap: true }
    }

    const urlLoader = {
        'loader': 'url-loader',
        options: {
            limit: 100000,
            name: '[name].[ext]'
        }
    }

    const babelLoader = {
        loader: 'babel-loader',
        options: { cacheDirectory: true }
    }

    const loaders = {
        sass: [styleLoader, cssLoader, postcssLoader, sassLoader],
        css: [styleLoader, cssLoader, postcssLoader],
        babel: [babelLoader],
        url: [urlLoader],
        ignore: ['ignore-loader']
    }

    return callback(loaders);
}
