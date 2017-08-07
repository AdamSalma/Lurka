var del = require('del');

module.exports = module.exports.default = function() {
    return del([
        'build/**/*',
        '!build/package.json',
        '!build/index.js',
        '!build/README.md',
        '!build/node_modules',
        '!build/node_modules/**/*'
    ])
}
