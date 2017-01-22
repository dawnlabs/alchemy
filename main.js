const menubar = require('menubar')
const electron = require('electron')
const path = require('path')
const url = require('url')

const { installImageMagick } = require('./src/api')
const configure = require('./src/helpers/configure')

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
  // Module to control application life.
  const app = electron.app
  // Module to create native browser window.
  const BrowserWindow = electron.BrowserWindow

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow

  const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })
} else { // PRODUCTION
  const mb = menubar({
    alwaysOnTop: true,
    width: 200,
    height: 200,
    icon: `${__dirname}/img/iconTemplate.png`
  })

  const { app } = mb

  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  mb.on('ready', () => {
    console.log('App started in menu bar.')
    // your app code here

    configure(mb)

    installImageMagick().then((code) => {
      if (code !== 0) mb.app.quit()
    })
  })
}
