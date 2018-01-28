import {BrowserWindow} from 'electron';
import Mustache from 'mustache';
import path from 'path';
import url from 'url';

import config from 'config';
import paths from 'config/paths';
import handleBeforeSendHeaders from './events/handleBeforeSendHeaders';
import handleRedirect from './events/handleRedirect';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main, preloader,
    mainPath, preloaderPath;


if (process.env.NODE_ENV == "production") {
    mainPath = path.join(__dirname, 'main.html');
    preloaderPath = path.join(__dirname, 'preloader.html');
} else {
    mainPath = path.join(__dirname, 'views', 'main.html');
    preloaderPath = path.join(__dirname, 'views', 'preloader.html');
}

console.info("main.html path:", mainPath);
console.info("preloader.html path:", preloaderPath);

export default function createWindows(app) {
    createPreloaderWindow();
    createMainWindow();

    if (process.env.NODE_ENV == "development") {
        main.webContents.openDevTools('right');
    }

    // Display UI when bundled and ready
    main.once('ready-to-show', () => {
        main.show();
        main.setFullScreen(true);
        preloader.close();
    });
}

function createPreloaderWindow(opts) {
    if (preloader)
       return preloader

    preloader = new BrowserWindow(config.electron.preloader);

    // preloader.loadURL(preloaderPath);
    preloader.loadURL(url.format({
        pathname: preloaderPath,
        protocol: 'file:',
        slashes: true
    }));

    preloader.on('closed', () => {
        preloader = null
    });
}

function createMainWindow(opts) {
    if (main)
        return main

    main = new BrowserWindow(config.electron.main)

    // Set custom headers to bypass 4chan image block
    main.webContents.session.webRequest.onBeforeSendHeaders(handleBeforeSendHeaders);

    // Open links in browser instead of new electron window
    main.webContents.on('new-window', handleRedirect);

    main.loadURL(url.format({
        pathname: mainPath,
        protocol: 'file:',
        slashes: true
    }));

    //main.loadURL(mainPath);

    main.on('closed', () => {
        main = null
    });
}


// Helper to render views
// https://github.com/electron/electron/issues/1146
function renderView(view, viewParams={}) {
    const data = Mustache.render(view, viewParams);
    return 'data:text/html;charset=UTF-8,' + encodeURIComponent(data);
}
