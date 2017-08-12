// Some of the below tasks use `require('config')` which is an
// alias defined in .babelrc
// Therfore, they need access to .babelrc through es6:
require('babel-register');

module.exports = {
    bundleApp: require('./bundleApp'),
    bundleElectron: require('./bundleElectron'),
    clear: require('./clear'),
    copyAssets: require('./copyAssets'),
    copyFonts: require('./copyFonts'),
    mkdirDist: require('./mkdirDist'),
    ensureAppIsBuilt: require('./ensureAppIsBuilt'),
}
