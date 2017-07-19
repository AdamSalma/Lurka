var fs = require('fs');
var path = require('path');
var distPath = path.join(__dirname, '../..', 'dist');

module.exports = module.exports.default = function() {
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
}
