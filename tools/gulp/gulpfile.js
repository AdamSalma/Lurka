import gulp from 'gulp';
import runSequence from 'run-sequence';
import * as tasks from './tasks';


/**
 * Build plan:
 *
 * Parse argv to get build targets
 * Clean the output directory
 * Run
 *
 *
 * Build app/electron/both
 * Package them up into dist
 */


/* Helpers */
gulp.task('clear', tasks.clear);
gulp.task('ensureAppIsBuilt', tasks.ensureAppIsBuilt);
gulp.task('mkdir-dist', tasks.mkdirDist);

/* Build */
gulp.task('build:electron', tasks.buildElectron);
gulp.task('build:app', tasks.buildApp);
gulp.task('build', gulp.series('clear', gulp.parallel('build:app', 'build:electron')));
// gulp.task('bundle:chrome', tasks.bundleChrome);


/* Package */
gulp.task('pre-package', gulp.parallel('ensureAppIsBuilt', 'mkdir-dist'));
gulp.task('package', gulp.series('pre-package', tasks.packageBuild));

/* Electron package */
// architectures: ia32, x64, armv7l
// platforms:  linux, win32, darwin, mas


// gulp.task('copy:assets', tasks.copyAssets);
// gulp.task('copy:fonts', tasks.copyFonts);
// gulp.task('copy', () => runSequence(['copy:assets'], 'copy:fonts'));



// gulp.task('default', );
