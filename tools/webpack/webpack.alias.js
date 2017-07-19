var path = require('path');
var rootPath = path.join(__dirname, '..', '..');

module.exports = {
    '-': rootPath,
    '~': path.join(rootPath, 'src', 'UI'),
    'sass': path.join(rootPath, 'src', 'UI', 'sass'),
    'resources': path.join(rootPath, 'src', 'Common', 'resources'),
}
