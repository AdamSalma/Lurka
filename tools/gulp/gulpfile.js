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


/**
 * Small helper for injecting cmd arguments to packager
 * @return {Function}
 */
const createPackager = (platforms) => (done) =>
    tasks.packageBuild(done, platforms
                                .split(' ')
                                .map(plat => `--${plat}`)
                                .join());


/* Build */
gulp.task('build:electron', tasks.buildElectron);
gulp.task('build:app', tasks.buildApp);
gulp.task('build:clear', gulp.series(tasks.clear, gulp.parallel('build:app', 'build:electron')));
// gulp.task('bundle:chrome', tasks.bundleChrome);


/* Package */
gulp.task('pre-package', gulp.parallel(tasks.ensureAppIsBuilt, tasks.mkdirDist));
gulp.task('package', gulp.series('pre-package', tasks.packageBuild));
gulp.task('package:win', gulp.series('pre-package', createPackager("windows")));
gulp.task('package:mac', gulp.series('pre-package', createPackager("mac")));
gulp.task('package:linux', gulp.series('pre-package', createPackager("linux")));
gulp.task('package:appveyor', gulp.series('pre-package', createPackager("appveyor")));
gulp.task('package:travis', gulp.series('pre-package', createPackager("travis")));
gulp.task('package:portable', gulp.series('pre-package', createPackager("current portable")));





/* Electron package */
// architectures: ia32, x64, armv7l
// platforms:  linux, win32, darwin, mas


// gulp.task('copy:assets', tasks.copyAssets);
// gulp.task('copy:fonts', tasks.copyFonts);
// gulp.task('copy', () => runSequence(['copy:assets'], 'copy:fonts'));



// gulp.task('default', );
