var gulp = require('gulp');
var webpack = require('webpack');

var clientConfig = require('./config/webpack.prod.client.js')
var serverConfig = require('./config/webpack.prod.server.js')


gulp.task('bundle-client', function(done) {
    webpack( clientConfig ).run(onBundle(done))
});

gulp.task('bundle-server', function(done) {
    webpack( serverConfig ).run(onBundle(done))
});

gulp.task('copy-html', function() {
	gulp.src('./src/index.html').pipe(gulp.dest('./app'))
});

gulp.task('bundle', ['bundle-client', 'bundle-server', 'copy-html']);


function onBundle(done) {
    return function(err, stats) {
        if (err) console.log('Error', err);
        else console.log(stats.toString());
        done()
    }
}
