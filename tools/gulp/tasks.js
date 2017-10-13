import webpack from 'webpack';
import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import paths from 'config/paths';
import getWebpackConfig from '../webpack';

/* Webpack tasks */
export const buildApp = (done) => {
    const config = getWebpackConfig({ prod: true });
    webpack(config).run(onWebpackBuild(done))
}

export const buildElectron = (done) => {
    const config = getWebpackConfig({ electron: true });
    webpack(config).run(onWebpackBuild(done))
}

const onWebpackBuild = (done) => (err, stats) => {
    err ? console.log('Error:', err)
        : console.log(stats.toString({chunks: false, colors: true}));
    done();
}
/* Webpack tasks end */


/* Helper tasks*/
export const clear = () =>
    del([
        'build/**/*',
        '!build/package.json',
        '!build/index.js',
        '!build/README.md',
        '!build/node_modules',
        '!build/node_modules/**/*'
    ])

export const copyAssets = () => {
    gulp.src('public/**/*', {base: 'src'}).pipe(gulp.dest('build/'));
};

export const copyFonts = () => {
    gulp.src('src/app/**/*.{ttf,svg,woff,eot}').pipe(gulp.dest('app/public/'))
};

const BUILD_COMMAND = "npm run build";

export const ensureAppIsBuilt = () => {
    if (!fs.existsSync(paths.app_bundle)) {
        console.log("\nLurka hasn't been built yet. No worries, we'll build it for you.\n")
        execSync(BUILD_COMMAND, {
            stdio:[0, 1, 2],  // stdio to redirect logging
        });
    }
}

export const mkdirDist = () => {
    if (!fs.existsSync(paths.dist)) {
        fs.mkdirSync(paths.dist);
    }
}
/* Helper tasks end */


/* Packaging tasks */
// TODO: Packaging tasks
