const menubar = require('menubar')

const configure = require('./src/helpers/configure')

const mb = menubar({
  alwaysOnTop: true,
  resizable: false,
  width: 292,
  height: 314,
  icon: `${__dirname}/img/iconTemplate.png`
})

const { app } = mb

mb.on('ready', () => {
  console.log('App started in menu bar.')
  configure(mb)
})
