const menubar = require('menubar')

const { installImageMagick } = require('./src/api')
const configure = require('./src/helpers/configure')

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
