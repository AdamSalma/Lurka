var gulp = require('gulp');
var runSequence = require('run-sequence');
var tasks = require('./gulp');

/* App Bundle */
gulp.task('bundle:app', tasks.bundleApp);
gulp.task('bundle:electron', tasks.bundleElectron);
gulp.task('bundle', ['bundle:app', 'bundle:electron']);

/* Copy */
// gulp.task('copy:assets', tasks.copyAssets);
// gulp.task('copy:fonts', tasks.copyFonts);
// gulp.task('copy', () => runSequence(['copy:assets'], 'copy:fonts'));

/* Clean */
gulp.task('clear', tasks.clear);

/* Build*/
gulp.task('build', (done) => runSequence('clear', 'bundle', done));
gulp.task('ensureAppIsBuilt', tasks.ensureAppIsBuilt);
gulp.task('mkdir:dist', tasks.mkdirDist);

gulp.task('prepackage', ['ensureAppIsBuilt', 'mkdir:dist']);

/* Electron package */
// architectures: ia32, x64, armv7l
// platforms:  linux, win32, darwin, mas

gulp.task('default', ['build']);
