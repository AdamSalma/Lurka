var gulp = require('gulp');

module.exports = module.exports.default = function() {
    gulp.src('src/app/**/*.{ttf,svg,woff,eot}').pipe(gulp.dest('app/public/'))
};
