var del = require('del');

module.exports = module.exports.default = function() {
    return del([
        'app/**/*',
        '!app/package.json',
        '!app/electron.index.js',
        '!app/node_modules',
        '!app/node_modules/**/*'
    ])
}
