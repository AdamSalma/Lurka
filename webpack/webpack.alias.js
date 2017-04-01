var path = require('path');
var rootPath = path.join(__dirname, '..')

module.exports = { 
    'Lurka': rootPath,
    '~': path.join(rootPath, 'src'),
    'styles': path.join(rootPath, 'src', 'styles'),
}
