var path = require('path');
var rootPath = path.join(__dirname, '..');

module.exports = {
    '-': rootPath,
    '~': path.join(rootPath, 'src'),
    'sass': path.join(rootPath, 'src', 'sass'),
    'public': path.join(rootPath, 'src', 'server', 'public'),
}
