const menubar = require('menubar')
const { app, autoUpdater, ipcMain } = require('electron')

const configure = require('./src/helpers/configure')

const server = 'https://alchemy.now.sh'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

try {
  autoUpdater.setFeedURL(feed)
} catch (e) { /* pass */ }

const mb = menubar({
  alwaysOnTop: true,
  resizable: false,
  width: 292,
  height: 344,
  icon: `${__dirname}/img/iconTemplate.png`
})

mb.on('ready', () => {
  console.log('App started in menu bar.')
  configure(mb)
})

ipcMain.on('APP_PATH_REQUEST', (event) => {
  event.sender.send('APP_PATH_REPLY', mb.app.getAppPath())
})
