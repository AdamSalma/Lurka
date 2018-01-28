import webpack from 'webpack';
import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import paths from 'config/paths';
import getWebpackConfig from '../webpack';
import getElectronPackageConfig from 'config/electron_packaging';

/* Webpack tasks */
export const buildApp = (done) => {
    const config = getWebpackConfig("prod");
    webpack(config).run(onWebpackBuild(done))
}

export const buildElectron = (done) => {
    const config = getWebpackConfig("electron");
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

export const copyAssets = () =>
    gulp
      .src('public/**/*', {base: 'src'})
      .pipe(gulp.dest('build/'));


export const copyFonts = () =>
    gulp
      .src('src/app/**/*.{ttf,svg,woff,eot}')
      .pipe(gulp.dest('app/public/'))

const BUILD_COMMAND = "npm run build";

export const ensureAppIsBuilt = (done) => {
    if (!fs.existsSync(paths.app_bundle)) {
        console.log("\nLurka hasn't been built yet. No worries, we'll build it for you.\n")
        execSync(BUILD_COMMAND, {
            stdio:[0, 1, 2],  // stdio to redirect logging
        });
    }
    done()
}

export const mkdirDist = (done) => {
    if (!fs.existsSync(paths.dist)) {
        fs.mkdir(paths.dist, done);
    } else {
        done()
    }
}
/* Helper tasks end */


/* Packaging tasks */

export const packageBuild = (done, args="current") => {
    const config = getElectronPackageConfig(args);
    console.dir(config);

    require('electron-builder')
        .build(config)
        .then(() => console.log("Packaging is complete! Open dist/ to see the output"))
        .then(done)
        // .then(() => console.log("App is packaged"))
        .catch((error) => {
            // handle error
            throw error;
        });
};

// TODO: Packaging tasks
