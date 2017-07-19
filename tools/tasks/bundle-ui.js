var webpack = require('webpack');
var clientConfig = require('../webpack/webpack.prod.client.js');

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
    webpack(clientConfig).run(onWebpackBundle(done))
}
