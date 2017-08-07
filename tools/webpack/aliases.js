/**
 * This file extracts .babelrc aliases for webpack to use, so that the aliases
 * are only defined in one place.
 *
 * The aliases in .babelrc are relative so they are converted to absolute.
 */

var readBabelrcUp = require('read-babelrc-up');
var config = require('config');
var path = require('path')
var aliases = {}

readBabelrcUp()
    .then(result => result.babel.plugins)
    .then(parsePlugins)
    .then(mapAliases)
    .catch( err => {
        throw err
    })

function parsePlugins(plugins) {
    var toString = Object.prototype.toString;

    for (var i = 0; i < plugins.length; i++) {
        // Check if plugin is array
        if (toString.call(plugins[i]) === '[object Array]') {
            // Check plugin title
            if (plugins[i][0] === "module-resolver") {
                // Extract aliases from .babelrc
                return plugins[i][1].alias
            }
        }
    }
}

function mapAliases(aliasObj) {
    for (var key in aliasObj) {
        if (aliasObj.hasOwnProperty(key)) {
            aliases[key] = path.join(config.paths.root, aliasObj[key]);
        }
    }
}

module.exports = module.exports.default = aliases
