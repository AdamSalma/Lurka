module.exports = injectLoaders((loaders) => [
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
        test: /\.(png|gif|woff(2)?|eot|ttf|svg|otf)(\?[a-z0-9=\.]+)?$/,
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

// Creates the loader configurations then injects them into a callback to
// create the loader array used by webpack
function injectLoaders(createLoaders) {
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

    // These rules define how
    const loaders = {
        sass: [styleLoader, cssLoader, postcssLoader, sassLoader],
        css: [styleLoader, cssLoader, postcssLoader],
        babel: [babelLoader],
        url: [urlLoader],
        ignore: ['ignore-loader']
    }

    return createLoaders(loaders);
}
