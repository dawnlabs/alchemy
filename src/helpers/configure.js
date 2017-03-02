const { globalShortcut } = require('electron')

module.exports = function(mb) {
  globalShortcut.register('Command+Shift+8', () => {
    if (mb.window && mb.window.isVisible()) mb.hideWindow()
    else mb.showWindow()
  })
}
