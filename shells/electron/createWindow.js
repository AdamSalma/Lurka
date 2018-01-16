import {BrowserWindow, protocol} from 'electron';
import path from 'path';
import url from 'url';
import fs from 'fs';


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
let main, preloader

let preloaderPath, indexPath;

if (process.env.NODE_ENV === "development") {
    indexPath = path.join(__dirname, 'dev', 'index.html')
    preloaderPath = path.join(__dirname, 'dev', `preloader.html`)
} else {
    indexPath = path.join(__dirname, 'index.html')
    preloaderPath = path.join(__dirname, "preloader.html")
}


var port = 9615;
export default function createWindow () {
    require('http').createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(fs.readFileSync(indexPath));
    }).listen(port);

    createPreloaderWindow();
    createMainWindow(port);

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
    // Open links in browser
    main.webContents.on('new-window', handleRedirect)

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


    main.loadURL(url.format({
        pathname: indexPath,
        protocol: 'file:',
        slashes: true
    }));

    main.on('closed', () => {
        main = null
    });


}
