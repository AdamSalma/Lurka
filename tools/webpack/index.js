require('babel-register');

module.exports = module.exports.default = function getConfig(env) {
    // Note: All configs run in production, except for dev

    switch (env) {
        /**
         * App Configs
         */
        case "dev":
        case "development":
            return require('./configs/dev');

        case "preview":
            return require('./configs/preview');

        case "prod":
        case "production":
            return require('./configs/prod');

        /**
         * Shell configs
         */
        case "electron":
            return require('./configs/electron');

        case "chrome":
            return require('./configs/chrome');
    }

    throw new Error(`No webpack config found for env '${env}'`);
}
