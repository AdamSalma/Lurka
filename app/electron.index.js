const {app, BrowserWindow} = require('electron')

const serverURL = 'http://127.0.0.1:3000'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Start up server
  require('./server.bundle.js')  
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})
  // Load the index.html
  win.loadURL(serverURL)

  win.setFullScreen(true);
  // Emitted when the window is closed.
  win.on('closed', (arg1, arg2) => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    console.warn(`arg1, arg2: ${arg1} ${arg2}`)
    win = null
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
