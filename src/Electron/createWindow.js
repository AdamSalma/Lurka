import {BrowserWindow} from 'electron';
import onBeforeSendHeaders from './events/onBeforeSendHeaders';

let preloaderIndex = `file://${__dirname}/resources/preloader.${config.env.production ? 'prod' : 'dev' }.html`
let mainIndex = `TBD`

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
            main.webContents.openDevTools('bottom');
    });
}

export default createWindow

function createPreloaderWindow(opts) {
    if (preloader)
       return preloader

    preloader = new BrowserWindow(config.electron.preloader)

    preloader.loadURL(preloaderIndex);

    preloader.on('closed', () => {
        preloader = null
    });
}

function createMainWindow(opts) {
    if (main)
        return main

    main = new BrowserWindow(config.electron.main)

    // Set custom headers to bypass 4chan image block
    main.webContents.session.webRequest.onBeforeSendHeaders(onBeforeSendHeaders);

    if (config.env.production) {
        // TODO: Where to load URL from. Webpack bundle?
        // main.loadURL(mainIndex);
        throw new Error("Not implemented");

    } else {
        let url;

        if (config.electron.devPerformance) {
            // Enable react performance
            url = `${config.server.url}?react_perf`
        } else {
            url = config.server.url
        }

        // Give enough time for UI bundle to begin, otherwise it loads an empty page
        setTimeout(() => {
            main.loadURL(url);
        }, 5000);
    }

    main.on('closed', () => {
        main = null
    });
}
