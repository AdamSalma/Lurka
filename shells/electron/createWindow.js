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
    mainView, preloaderView;


if (process.env.NODE_ENV == "production") {
    mainView = renderView(require("./views/main.html"), {
        scriptSrc: path.join(__dirname, "app.bundle.js")
    });
    preloaderView = renderView(require("./views/preloader.html"), {
        logoSrc: paths.logo
    });
} else {
    mainView = renderView(require("./views/main.html"), {
        scriptSrc: config.server.url
    });
    preloaderView = renderView(require("./views/preloader.html"), {
        logoSrc: paths.logo
    });
}

console.info("main.html path:", mainView)
console.info("preloader.html path:", preloaderView)

export default function createWindow () {
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

    preloader.loadURL(preloaderView);
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

    main.loadURL(mainView);
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
