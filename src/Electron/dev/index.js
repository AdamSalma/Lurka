const {app, BrowserWindow} = require('electron');

// TODO: Refactor webpack to copy the config file to the current dir.
const config = require('../../../config');
const onBeforeSendHeaders = require('./onBeforeSendHeaders');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main, preloader

function createWindow () {

  // Create the windows
  main = new BrowserWindow(config.electron.main);
  preloader = new BrowserWindow(config.electron.preloader);

  // Load preloader modal
  preloader.loadURL(`file://${__dirname}/preloader/preloader.html`);

  // Give enough time for bundle to begin, otherwise it loads an empty page
  setTimeout(() => {
    main.loadURL(config.server.url);
  }, 2000);

  // Set custom headers to bypass 4chan image block
  main.webContents.session.webRequest.onBeforeSendHeaders(onBeforeSendHeaders);

  // Display UI when bundled and ready
  main.once('ready-to-show', () => {
    main.show();
    preloader.close();
    main.webContents.openDevTools('bottom');
  });

  // Dereference the windows on close
  main.on('closed', () => {
    main = null
  });

  preloader.on('closed', () => {
    preloader = null
  });
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
