require('babel-register');

module.exports = module.exports.default = function getConfig(env) {
    // Note: All configs run in production, except for dev

    switch (env) {
        /**
         * App Configs
         */
        case "dev":
        case "development":
            return require('./webpack.dev');

        case "preview":
            return require('./webpack.preview');

        case "prod":
        case "production":
            return require('./webpack.prod');

        case "test":
            return require('./webpack.test');

        /**
         * Shell configs
         */
        case "electron":
            return require('./webpack.electron');

        case "chrome":
            return require('./webpack.chrome');
    }

    throw new Error(`No webpack config found for env '${env}'`);
}
