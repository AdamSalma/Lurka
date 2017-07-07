const path = require('path');
const node_modules = path.join(__dirname + '/../../app/node_modules');
require('module').globalPaths.push(node_modules);

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

  preloader = new BrowserWindow(Object.assign({}, config.electron.preloader, {
    parent: main
  }));

  preloader.loadURL(`file://${__dirname}/preloader/preloader.html`);

  // Toggle preloader when webpack bundle completes.
  main.once('ready-to-show', () => {
    main.show();
    preloader.hide();
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
