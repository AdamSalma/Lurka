import { packageBuild } from './tasks'

// Allows defining tasks in any order
export const register = (gulp) => {
    gulp.registry(require("undertaker-forward-reference")());
}


/**
 * Small helper for injecting cmd arguments to packager
 * @return {Function}
 */
export const createPackager = (platforms) => function packager(done) {
    return packageBuild(platforms.split(" ").map(p => `--${p}`), done);
}
