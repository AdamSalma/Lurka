var gulp = require('gulp');
var webpack = require('webpack-stream');

var client = {
    config: require('./config/webpack.prod.client.js'),
    in: './src/client/index.jsx'
}, server = {
    config: require('./config/webpack.prod.server.js'),
    in: './src/server/index.js'
};

gulp.task('bundle-client', function() {
    return gulp.src( client.in )
        .pipe( webpack( client.config ) )
        .pipe( gulp.dest('./app/') )
});

gulp.task('bundle-server', function() {
    return gulp.src( server.in )
        .pipe( webpack( server.config ) )
        .pipe( gulp.dest('./app/') )
});

gulp.task('bundle', ['bundle-client', 'bundle-server']);
