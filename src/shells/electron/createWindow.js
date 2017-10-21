import {BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

import handleBeforeSendHeaders from './events/handleBeforeSendHeaders';
import handleRedirect from './events/handleRedirect';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main, preloader

export default function createWindow () {
    createPreloaderWindow();
    createMainWindow();

    // Display UI when bundled and ready
    main.once('ready-to-show', () => {
        main.show();
        main.setFullScreen(true);
        preloader.close();

        if (config.env.development)
            main.webContents.openDevTools('right');
    });
}

function createPreloaderWindow(opts) {
    if (preloader)
       return preloader

    preloader = new BrowserWindow(config.electron.preloader)

    var preloaderPath;

    if (process.env.NODE_ENV === "development") {
        preloaderPath = path.join(__dirname, 'dev', `preloader.html`)
    } else {
        preloaderPath = path.join(__dirname, "preloader.html")
    }

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

    // Open links in browser
    main.webContents.on('new-window', handleRedirect)

    var indexPath;

    if (process.env.NODE_ENV === "development") {
        indexPath = path.join(__dirname, 'dev', 'index.html')
    } else {
        indexPath = path.join(__dirname, 'index.html')
    }

    main.loadURL(url.format({
        pathname: indexPath,
        protocol: 'file:',
        slashes: true
    }));

    main.on('closed', () => {
        main = null
    });
}
