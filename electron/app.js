import { app } from 'electron';
import createWindow from './createWindow';

let canStartApp = true;

if (process.env.NODE_ENV === "production") {
  // Check for application updates
    require("electron-updater")
      .autoUpdater
      .checkForUpdatesAndNotify();
}

if (canStartApp) {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => createWindow(app));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (win === null) {
      createWindow(app);
    }
  });
}

