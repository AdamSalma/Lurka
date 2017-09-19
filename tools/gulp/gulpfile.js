import gulp from 'gulp';
import runSequence from 'run-sequence';
import * as tasks from './tasks';

/* Build */
gulp.task('build', done => runSequence('clear', 'build-all', done));
gulp.task('build-all', ['build:app', 'build:electron' /*'build:chrome'*/])
gulp.task('build:app', tasks.buildApp);
gulp.task('build:electron', tasks.buildElectron);
// gulp.task('bundle:chrome', tasks.bundleChrome);


/* Package */
gulp.task('prepackage', ['ensureAppIsBuilt', 'mkdir-dist']);
gulp.task('package', done => runSequence('prepackage', ['package:electron', 'package:chrome'], done));
gulp.task('package:electron', done => runSequence('prepackage', tasks.packageElectron, done));
gulp.task('package:chrome', done => runSequence('prepackage', tasks.packageChrome, done));

/* Electron package */
// architectures: ia32, x64, armv7l
// platforms:  linux, win32, darwin, mas


/* Helpers */
gulp.task('clear', tasks.clear);
gulp.task('ensureAppIsBuilt', tasks.ensureAppIsBuilt);
gulp.task('mkdir-dist', tasks.mkdirDist);
// gulp.task('copy:assets', tasks.copyAssets);
// gulp.task('copy:fonts', tasks.copyFonts);
// gulp.task('copy', () => runSequence(['copy:assets'], 'copy:fonts'));



gulp.task('default', ['build']);
