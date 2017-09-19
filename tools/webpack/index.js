require('babel-register');

module.exports = module.exports.default = function getConfig(env) {
    // App config - dev/prod
    if (env.dev) {
        return require('./configs/dev');
    }

    if (env.prod) {
        return require('./configs/prod');
    }

    // Shell configs - always in production
    if (env.electron) {
        return require('./configs/electron');
    }

    if (env.chrome) {
        return require('./configs/chrome');
    }
}
