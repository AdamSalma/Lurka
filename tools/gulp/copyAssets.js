var gulp = require('gulp');

module.exports = module.exports.default = function() {
    gulp.src('public/**/*', {base: 'src'}).pipe(gulp.dest('app/'));
};
