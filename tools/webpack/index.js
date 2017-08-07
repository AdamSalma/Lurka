require('babel-register');

module.exports = function(env) {
    if (env.electron) {
        return require('./configs/electron');
    }

    if (env.chrome) {
        return require('./configs/chrome');
    }

    if (env.dev) {
        return require('./configs/dev');
    }

    if (env.prod) {
        return require('./configs/prod');
    }
}
