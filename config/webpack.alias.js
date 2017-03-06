var path = require('path');
var rootPath = path.join(__dirname, '..')

module.exports = { 
    '~': path.join(rootPath, 'src', 'client'),
    '~server': path.join(rootPath, 'src', 'server'),
    '~root': rootPath,
    'react': 'preact-compat',
	'react-dom': 'preact-compat'
}
