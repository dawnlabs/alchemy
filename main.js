const menubar = require('menubar')
const { ipcMain, autoUpdater} = require('electron')
const ms = require('ms')

const configure = require('./src/helpers/configure')

const mb = menubar({
  alwaysOnTop: true,
  resizable: false,
  width: 292,
  height: 344,
  icon: `${__dirname}/img/iconTemplate.png`
})

const server = 'https://alchemy.now.sh/'
const feed = `${server}/update/${process.platform}/${mb.app.getVersion()}`

// Setup auto-updater
try {
  autoUpdater.setFeedURL(feed)
} catch (err) {}

setTimeout(() => {
  autoUpdater.checkForUpdates()
}, ms('10s'));

setInterval(() => {
  autoUpdater.checkForUpdates()
}, ms('30m'));

autoUpdater.on('update-downloaded', () => {
  // Then restart the application
  autoUpdater.quitAndInstall()
  app.quit()
})

mb.on('ready', () => {
  console.log('App started in menu bar.')
  configure(mb)
})

ipcMain.on('APP_PATH_REQUEST', (event) => {
  event.sender.send('APP_PATH_REPLY', mb.app.getAppPath())
})
