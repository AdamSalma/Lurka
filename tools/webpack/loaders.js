export default injectLoaders(createNormalRules);


// Creates the loader configurations then injects them into a callback to
// create the loader array used by webpack
function injectLoaders(createLoaders) {
    const cssLoader = {
        loader: require.resolve('css-loader'),
        options: {
            importLoaders: 1,
            sourceMap: true
        }
    }

    const postcssLoader = {
        loader: require.resolve('postcss-loader'),
        options: {
            sourceMap: true,
            plugins: (loader) => [require('autoprefixer')()]
        }
    }

    const sassLoader = {
        loader: require.resolve('sass-loader'),
        options: { sourceMap: true }
    }

    const styleLoader = {
        loader: require.resolve('style-loader'),
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
        loader: require.resolve('babel-loader'),
        options: { cacheDirectory: true }
    }

    const htmlLoader = {
        loader: require.resolve('html-loader')
    }

    // These rules define how
    const loaders = {
        sass: [styleLoader, cssLoader, postcssLoader, sassLoader],
        css: [styleLoader, cssLoader, postcssLoader],
        babel: [babelLoader],
        url: [urlLoader],
        ignore: ['ignore-loader'],
        html: [htmlLoader]

    }

    return createLoaders(loaders);
}


function createNormalRules(loaders) {
    return [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: loaders.babel,
    }, {
        test: /\.sass|scss$/,
        exclude: /node_modules/,
        use: loaders.sass
    }, {
        test: /\.css$/,
        use: loaders.css
    }, {
        test: /\.(png|gif|woff(2)?|eot|ttf|svg|otf)(\?[a-z0-9=\.]+)?$/,
        use: loaders.url
    }, {
        test: /\.(md|ejs)$/,
        use: loaders.ignore
    }, {
        test: /\LICENSE$/,
        use: loaders.ignore
    }, {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: loaders.html
    }]
}


/**
 * Test Rules
 * Same as normal, but ignores all stylesheets
 */
function createTestRules (loaders) {
    return [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: loaders.babel,
    }, {
        test: /\.sass|scss$/,
        exclude: /node_modules/,
        use: loaders.ignore
    }, {
        test: /\.css$/,
        use: loaders.ignore
    }, {
        test: /\.(png|gif|woff(2)?|eot|ttf|svg|otf)(\?[a-z0-9=\.]+)?$/,
        use: loaders.url
    }, {
        test: /\.(md|ejs)$/,
        use: loaders.ignore
    }, {
        test: /\LICENSE$/,
        use: loaders.ignore
    }]
}
