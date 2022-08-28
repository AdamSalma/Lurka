import config from "config";
import paths from "config/paths";

// Defines webpack rules
export const buildRules = (loaders) => [
  {
    test: /\.tsx?$/,
    use: loaders.typescript,
    exclude: /node_modules/,
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: loaders.babel,
  },
  {
    test: /\.sass|scss$/,
    exclude: /node_modules/,
    use: loaders.sass,
  },
  {
    test: /\.css$/,
    use: loaders.css,
  },
  {
    test: /\.(png|gif|woff(2)?|eot|ttf|svg|otf)(\?[a-z0-9=\.]+)?$/,
    use: loaders.url,
  },
  {
    test: /\.(md|ejs|LICENSE)$/,
    use: loaders.ignore,
  },
  {
    test: /(main|preloader)\.html$/,
    exclude: /node_modules/,
    use: loaders.mustache,
  },
];

// Defines how rules should be implemented, then uses the above `buildRules` to map them
export default function createLoaders(env) {
  const cssLoader = {
    loader: require.resolve("css-loader"),
    options: {
      importLoaders: 1,
      sourceMap: true,
    },
  };

  const postcssLoader = {
    loader: require.resolve("postcss-loader"),
    options: {
      sourceMap: true,
      plugins: (loader) => [require("autoprefixer")()],
    },
  };

  const sassLoader = {
    loader: require.resolve("sass-loader"),
    options: { sourceMap: true },
  };

  const styleLoader = {
    loader: require.resolve("style-loader"),
    options: { sourceMap: true },
  };

  const urlLoader = {
    loader: "url-loader",
    options: {
      limit: 100000,
      name: "[name].[ext]",
    },
  };

  const babelLoader = {
    loader: require.resolve("babel-loader"),
    options: { cacheDirectory: true },
  };

  const typescriptLoader = {
    loader: require.resolve("ts-loader"),
  };

  // We pass in mustache options here:
  const mustacheLoader = {
    loader: require.resolve("mustache-loader"),
    options: {
      tiny: true,
      render: {
        logoSrc: paths.logo,

        // This is how the client code is loaded.
        // Either in `development` via the the dev server (configurable)
        // Or through the current directory as a webpack build output
        scriptSrc:
          env == "production"
            ? "./app.bundle.js" // TODO AS: Make this configurable.
            : config.server.url,

        preloaderText: env == "production" ? "Preparing Dank" : "Building",
      },
    },
  };

  // These rules define how webpack deals with files
  return buildRules({
    sass: [styleLoader, cssLoader, postcssLoader, sassLoader],
    css: [styleLoader, cssLoader, postcssLoader],
    babel: [babelLoader],
    url: [urlLoader],
    ignore: ["ignore-loader"],
    mustache: [mustacheLoader],
    typescript: [babelLoader, typescriptLoader],
  });
}
