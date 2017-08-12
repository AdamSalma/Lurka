var webpack = require('webpack');
var electronConfig = require('../webpack/configs/electron');

function onWebpackBundle(done) {
    return function(err, stats) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log(stats.toString({
                chunks: false,
                colors: true
            }));
        }

        done();
    }
}

module.exports = module.exports.default = function(done) {
    webpack(electronConfig).run(onWebpackBundle(done))
}
