var fs = require('fs');
var distPath = require('config').paths.dist;

module.exports = module.exports.default = function() {
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
}
