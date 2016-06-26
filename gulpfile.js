var gulp = require('gulp');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var gulpTypings = require('gulp-typings');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');


/*---------*/
/*  SETUP  */
/*---------*/

var PATH = {
    // config 
    webpack_config: './client/config/webpack.config.js',
    ts_config: './client/config/tsconfig.json',
    
    // in
    ts: './client/src', 
    sass: './client/sass', 
    
    // out
    js: './client/build',
    css: './public/css',
    webpack: "./public/js"
};

var sassPrefix = [
    "Android 2.3",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 24",
    "Explorer >= 9",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6"
];

/* ------- */
/*  TASKS  */
/* ------- */

// Typings install
gulp.task('typings', function() {
     return gulp.src("typings.json")
        .pipe(gulpTypings()); 
});



// Webpack
// - Compiles before bundling
gulp.task('ng-bundle', ['sass', 'ng-ts'], function() {
    return gulp.src( PATH.js + "/index.js" )
        .pipe( webpack( require(PATH.webpack_config)))
        .pipe( gulp.dest( PATH.webpack ) )
});

// Webpack
// - No compilation
gulp.task('bundle', function() {
    return gulp.src( PATH.js + "/index.js" )
        .pipe( webpack( require(PATH.webpack_config)))
        .pipe( gulp.dest( PATH.webpack ) )
});

// TypeScript
gulp.task('ng-ts', function() {
    var tsProject = ts.createProject( PATH.ts_config );
    var tsResult = gulp.src(PATH.ts + "/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    
    return merge([
        tsResult.dts.pipe(gulp.dest( PATH.js + '/definitions')),
        tsResult.js.pipe(gulp.dest( PATH.js ))
    ])
});

// SASS
gulp.task('sass', function () {
 
    return gulp.src(PATH.sass + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({ outputStyle: 'nested' }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: sassPrefix }))
        .pipe(concat('app.styles.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(PATH.css))

});

/* ------- */
/*  WATCH  */
/* ------- */

gulp.task('watch', function () {

    // Watch typescript files and execute using 'ng-ts'
    gulp.watch(PATH.ts + '/**/*', ['ng-ts'])
        .on("change", function (event) {
            console.log('[TYPESCRIPT] File ' + event.path.replace(/^.*(\\|\/|\:)/, '') + ' was ' + event.type + ', compiling...');
        });

    // Watch sass files and execute using 'ng-ts'
    gulp.watch(PATH.sass + '/**/*', ['sass'])
        .on("change", function (event) {
            console.log('[SASS] File ' + event.path.replace(/^.*(\\|\/|\:)/, '') + ' was ' + event.type + ', compiling...');
        });
});

gulp.task('default', ['bundle']);

