const menubar = require('menubar')

const configure = require('./src/helpers/configure')

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
