var gulp = require('gulp');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var del = require('del');

var clientConfig = require('./webpack/webpack.prod.client.js')
var serverConfig = require('./webpack/webpack.prod.server.js')


/* App Bundle */
gulp.task('bundle:client', function(done) {
    webpack( clientConfig ).run(onWebpackBundle(done))
});

gulp.task('bundle:server', function(done) {
    webpack( serverConfig ).run(onWebpackBundle(done))
});

/* Copy */
gulp.task('copy:assets', function() {
	gulp.src('public/**/*', {base: 'src'}).pipe(gulp.dest('app/'))
});

gulp.task('copy:electron', function() {
    gulp.src('src/electron/**/*').pipe(gulp.dest('app/'))
});

gulp.task('copy:fonts-to-assets', function() {
    gulp.src('src/app/**/*.{ttf,svg,woff,eot}').pipe(gulp.dest('app/public/'))
});

/* Clean */
gulp.task('clear', function() {
    return del([
        'app/**/*',
        '!app/package.json',
        '!app/node_modules',
        '!app/node_modules/**/*'
    ])
});

gulp.task('copy', function(){
    runSequence(['copy:assets', 'copy:electron'], 'copy:fonts-to-assets')
})


/* Main tasks */
gulp.task('bundle', ['bundle:client', 'bundle:server']);
gulp.task('build', function(done){  // TODO - full elctron build
    runSequence('clear', 'bundle', 'copy', done)
})  
gulp.task('default', ['build']);


function onWebpackBundle(done) {
    return function(err, stats) {
        if (err) console.log('Error', err);
        else console.log(stats.toString({chunks: false, colors: true}));
        done()
    }
}
