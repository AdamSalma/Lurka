/**
 * This file extracts .babelrc aliases for webpack to use, so that the aliases
 * are only defined in one place.
 *
 * The aliases in .babelrc are relative so they are converted to absolute.
 */

import readBabelrcUp from 'read-babelrc-up';
import paths from 'config/paths';
import path from 'path';

var webpackAliases = {}

// Some modules cause Webpack to output warnings when building.
// This hides the errors by aliasing each module.
const WARNING_PLUGIN_ALIASES = [
    // 'babel-register',
    // 'babel-core'
];

const babelrc = readBabelrcUp.sync();
const babelrcAliases = parseBabelrc(babelrc);

mapAliases(babelrcAliases, webpackAliases);

fixModuleWarnings(WARNING_PLUGIN_ALIASES);

export default webpackAliases;


function parseBabelrc(babelrc) {
    const toString = Object.prototype.toString;
    const {plugins} = babelrc.babel;

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

function mapAliases(source, target) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = path.join(paths.root, source[key]);
        }
    }
}

function fixModuleWarnings(packages) {
    packages.forEach(module => {
        webpackAliases[module] = path.join(paths.app_modules, module);
    });
}
