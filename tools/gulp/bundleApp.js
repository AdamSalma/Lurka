var webpack = require('webpack');
var appConfig = require('../webpack/configs/prod');

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
    webpack(appConfig).run(onWebpackBundle(done))
}
