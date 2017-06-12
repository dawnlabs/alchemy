const { remote } = require('electron')

const { Menu, MenuItem } = remote

function configureSettingsMenu() {
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'asdf'
  }))

  return menu
}

export default configureSettingsMenu()
