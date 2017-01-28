const menubar = require('menubar')

const { installImageMagick } = require('./src/api')
const configure = require('./src/helpers/configure')

const mb = menubar({
  alwaysOnTop: true,
  // resizable: false,
  width: 270,
  height: 350,
  icon: `${__dirname}/img/iconTemplate.png`
})

const { app } = mb

mb.on('ready', () => {
  console.log('App started in menu bar.')
  configure(mb)
})
