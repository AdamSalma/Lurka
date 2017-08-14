// This binds the root directory to path.join, so it can be used to join paths
// relative to the root dir

var pathToRootRelative = '../..';
var join = require('path').join.bind(null, __dirname, pathToRootRelative);

var paths = {
    root:           join(),
    app:            join('src', 'app'),
    app_entry:      join('src', 'app', 'index.jsx'),
    app_html:       join('src', 'app', 'index.html'),
    build:          join('build'),
    app_modules:    join('build', 'node_modules'),
    app_bundle:     join('build', 'app.bundle.js'),
    dist:           join('dist'),
    electron_entry: join('src', 'shells', 'electron', 'index.js'),
}

module.exports = module.exports.default = paths;
