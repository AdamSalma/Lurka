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

gulp.task('move-assets', function() {
	gulp.src('./src/assets/**/*', {base: './src'}).pipe(gulp.dest('./app/'))
});


gulp.task('bundle', ['bundle-client', 'bundle-server']);
gulp.task('build', ['bundle', 'move-assets'])  // TODO - elctron build


function onBundle(done) {
    return function(err, stats) {
        if (err) console.log('Error', err);
        else console.log(stats.toString());
        done()
    }
}
