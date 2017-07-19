var gulp = require('gulp');
var runSequence = require('run-sequence');
var tasks = require('./tasks');

/* App Bundle */
gulp.task('bundle:ui', tasks.bundleUI);
gulp.task('bundle:server', tasks.bundleServer);
gulp.task('bundle', ['bundle:ui', 'bundle:server']);

/* Copy */
gulp.task('copy:assets', tasks.copyAssets);
gulp.task('copy:fonts', tasks.copyFonts);
gulp.task('copy', () => runSequence(['copy:assets'], 'copy:fonts'));

/* Clean */
gulp.task('clear', tasks.clear);

/* Build*/
gulp.task('build', (done) => runSequence('clear', 'bundle', 'copy', done))
