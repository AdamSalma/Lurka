import {BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

import handleBeforeSendHeaders from './events/handleBeforeSendHeaders';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main, preloader

const createWindow = () => {
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

export default createWindow

function createPreloaderWindow(opts) {
    if (preloader)
       return preloader

    preloader = new BrowserWindow(config.electron.preloader)


    if (process.env.NODE_ENV === "development") {
        preloader.loadURL(url.format({
            pathname: path.join(__dirname, 'dev', `preloader.html`),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        preloader.loadURL(url.format({
            pathname: path.join(__dirname, "preloader.html"),
            protocol: 'file:',
            slashes: true
        }));
    }

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

    if (process.env.NODE_ENV === "development") {
        // Allow dynamic webpack content serving
        // main.__WebpackUrl__ = config.server.url + "app.bundle.js"
        main.loadURL(url.format({
            pathname: path.join(__dirname, 'dev', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        main.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    main.on('closed', () => {
        main = null
    });
}
