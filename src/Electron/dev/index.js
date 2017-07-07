const {app, BrowserWindow} = require('electron');

// TODO: Refactor webpack to copy the config file to the current dir.
const config = require('../../../config');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main

function createWindow () {

  // Create the browser window.
  main = new BrowserWindow(config.electron.main);
  main.webContents.openDevTools();

  main.loadURL(config.server.url);
  // main.session.webRequest.onBeforeSendHeaders([filter, ]listener)
  // main.webContents.setUserAgent(userAgent)
  // main.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
  //   // details.requestHeaders
  //   main.webContents.executeJavaScript(() => { alert(details.requestHeaders) })
  // });

  main.webContents.session.webRequest.onBeforeSendHeaders(function(details, callback) {
    details.requestHeaders['Host'] = "s.4cdn.org";
    details.requestHeaders['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0";
    details.requestHeaders['DNT'] = 1;
    details.requestHeaders['TESTING'] = 1;
    callback({cancel: false, requestHeaders: details.requestHeaders});
  });

  preloader = new BrowserWindow(Object.assign({}, config.electron.preloader, {
    parent: main
  }));

  preloader.loadURL(`file://${__dirname}/preloader/preloader.html`);

  // Toggle preloader when webpack bundle completes.
  main.once('ready-to-show', () => {
    main.show();
    preloader.hide();
    // main.webContents.downloadURL('http://i.4cdn.org/g/1499398209850.jpg');
  })

  main.setFullScreen(true);

  // Emitted when the window is closed.
  main.on('closed', (arg1, arg2) => {

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    console.warn(`arg1, arg2: ${arg1} ${arg2}`)
    main = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (win === null) {
    createWindow()
  }
})
