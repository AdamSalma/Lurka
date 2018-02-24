import {BrowserWindow, protocol} from 'electron';
import Mustache from 'mustache';
import path from 'path';
import url from 'url';
import fs from 'fs';


import config from 'config';
import paths from 'config/paths';
import handleBeforeSendHeaders from './events/handleBeforeSendHeaders';
import handleRedirect from './events/handleRedirect';

// protocol.registerStandardSchemes(['test'], {
//     secure: false
// })

/**
 * IDEAS:
 *
 * 1) Parse templates with mustache:
 *    File -> html string -> data URL => inject into BrowserWindow
 *
 * 2) Bundle electron code before use.
 *    Bundle output to build/ then use that for production build as well as dev.
 *
 */

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

        if (process.env.NODE_ENV === "development") {
            main.webContents.openDevTools('bottom');
        }
    });
}

function createPreloaderWindow(opts) {
    if (preloader)
       return preloader

    preloader = new BrowserWindow(config.electron.preloader)

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
    // main.webContents.session.webRequest.onBeforeRequest({
    //     urls: ["https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc*"]
    // }, (details, callback) => {

    //     console.log("\nHANDLINGGGGGGG", details.url)
    //     var afterUrl = details.url.split('&co=dGVzdDovL3c.').join('&co=aHR0cDovL2JvYXJkcy40Y2hhbi5vcmc6ODA.')
    //     console.log("Redirecting to:", afterUrl);

    //     for ( let x in details ) {
    //         console.log(x)
    //     }

    //     return callback({
    //         redirectURL: afterUrl
    //     })

    // });

    // main.webContents.session.webRequest.onHeadersReceived({
    //     urls: ["https://www.google.com/recaptcha/api2/anchor*"]
    // }, (details, callback) => {
    //     console.log("\n\n\nHEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
    //     console.log(details.url)
    //     console.log(details.statusLine)
    //     callback({
    //         cancel: false,
    //         // responseHeaders: {
    //         //     statusCode: 200
    //         // }
    //     })
    // })

    // Register protocol to allow recaptcha
    // https://github.com/electron/electron/issues/8414
    // protocol.registerBufferProtocol('test', (request, callback) => {
    //     console.log("test:// buffer protocol to: ", request.url)
    //     callback({
    //         mimeType: 'text/html',
    //         data: fs.readFileSync(indexPath)
    //     })
    // }, (error) => {
    //     if (error) console.error('Failed to register protocol')
    // });

    // protocol.interceptHttpProtocol("http", (request, callback) => {
    //     console.log("**INTERCEPTED", request.url)
    //     if (request.url.includes('https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc')) {
    //         console.log("Intercepted url is captcha")
    //         callback({
    //             url: request.url.split('&co=dGVzdDovL3c.').join('&co=aHR0cDovL2JvYXJkcy40Y2hhbi5vcmc6ODA.'),
    //             session: null
    //         })
    //     } else {
    //         console.log("Intercepted url is NOT captcha")
    //         return callback({
    //             url: request.url,
    //             method: request.method,
    //             referer: request.referer,
    //             session: null
    //         });
    //         // return callback({
    //         //     ...request, session: null})
    //     }
    // })


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
