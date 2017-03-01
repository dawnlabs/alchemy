const menubar = require('menubar')

const configure = require('./src/helpers/configure')
const { installImageMagick } = require('./src/api')

const mb = menubar({
  alwaysOnTop: true,
  resizable: false,
  width: 292,
  height: 324,
  icon: `${__dirname}/img/iconTemplate.png`
})

const { app } = mb

mb.on('ready', () => {
  console.log('App started in menu bar.')
  configure(mb)

  installImageMagick().then(console.log).catch(console.log)
})
