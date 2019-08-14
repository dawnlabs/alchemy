const { menubar } = require('menubar')
const { ipcMain } = require('electron')

const configure = require('./src/helpers/configure')

const mb = menubar({
  browserWindow: {
    alwaysOnTop: true,
    width: 292,
    height: 360,
    webPreferences: {
      nodeIntegration: true
    }
  },
  resizable: false,
  icon: `${__dirname}/img/iconTemplate.png`
})

mb.on('ready', () => {
  console.log('App started in menu bar.')
  configure(mb)

  mb.tray.on('drag-enter', () => mb.showWindow())
})

mb.on('focus-lost', () => mb.hideWindow())

ipcMain.on('APP_PATH_REQUEST', event => {
  event.sender.send('APP_PATH_REPLY', mb.app.getAppPath())
})
