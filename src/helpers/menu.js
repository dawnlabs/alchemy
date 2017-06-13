const { remote, shell } = require('electron')

const { app, Menu } = remote

const toggleOpenAtLogin = menuItem =>
  app.setLoginItemSettings({ openAtLogin: menuItem.checked, openAsHidden: true })

const configureSettingsMenu = () => {
  return Menu.buildFromTemplate([
    {
      label: `Alchemy ${app.getVersion()}`,
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Start at Login',
      type: 'checkbox',
      checked: app.getLoginItemSettings().openAtLogin,
      click: toggleOpenAtLogin
    },
    { type: 'separator' },
    {
      label: 'Check for updates...',
      click() {
        shell.openExternal('https://github.com/dawnlabs/alchemy/releases')
      }
    },
    {
      label: 'Submit Feedback...',
      click() {
        shell.openExternal('mailto:hi@dawnlabs.io?subject=Alchemy Feedback&body=')
      }
    },
    { type: 'separator' },
    { label: 'Quit Alchemy', role: 'quit' }
  ])
}

module.exports = configureSettingsMenu()
