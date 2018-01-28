import gulp from 'gulp';
import * as tasks from './tasks';
import { register, createPackager } from './utils'

register(gulp);


/* Build Tasks */
gulp.task('build', gulp.series(gulp.parallel('build:app', 'build:electron')));
gulp.task('build:app', tasks.buildApp);
gulp.task('build:electron', tasks.buildElectron);
gulp.task('build:clear', tasks.clear);
// After Lurka v1.0:
// gulp.task('bundle:chrome', tasks.bundleChrome);


/* Electron Packaging Tasks */
gulp.task('pre-package', gulp.parallel('ensureAppIsBuilt', 'mkdir-dist'));
gulp.task('package', gulp.series('pre-package', createPackager("current")));
gulp.task('package:win', gulp.series('pre-package', createPackager("windows")));
gulp.task('package:mac', gulp.series('pre-package', createPackager("mac")));
gulp.task('package:linux', gulp.series('pre-package', createPackager("linux")));
gulp.task('package:portable', gulp.series('pre-package', createPackager("current portable")));

gulp.task('publish:appveyor', gulp.series('pre-package', createPackager("appveyor")));
gulp.task('publish:travis', gulp.series('pre-package', createPackager("travis")));


/* Helper Tasks */
gulp.task('ensureAppIsBuilt', tasks.ensureAppIsBuilt);
gulp.task('mkdir-dist', tasks.mkdirDist);
// gulp.task('copy', () => runSequence(['copy:assets'], 'copy:fonts'));
// gulp.task('copy:fonts', tasks.copyFonts);
// gulp.task('copy:assets', tasks.copyAssets);



