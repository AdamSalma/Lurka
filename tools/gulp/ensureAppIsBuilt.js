var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync

var BUILD_COMMAND = "npm run build";
var appBundlePath = require('config').paths.app_bundle;

module.exports = module.exports.default = function() {
    if (!fs.existsSync(appBundlePath) || !fs.existsSync(appBundlePath)) {
        console.log("\nLurka hasn't been built yet. No worries, we'll build it for you.\n")
        execSync(BUILD_COMMAND, {
            stdio:[0, 1, 2],  // stdio to redirect logging
        });
    }
}
