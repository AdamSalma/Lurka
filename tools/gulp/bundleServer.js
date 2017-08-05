var webpack = require('webpack');
var serverConfig = require('../webpack/webpack.prod.server.js');

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
    webpack(serverConfig).run(onWebpackBundle(done))
}
