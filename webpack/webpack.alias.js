var path = require('path');
var rootPath = path.join(__dirname, '..');

module.exports = {
    '-': rootPath,
    '~': path.join(rootPath, 'src', 'UI'),
    'sass': path.join(rootPath, 'src', 'UI', 'sass'),
    'public': path.join(rootPath, 'src', 'Server', 'public'),
}
