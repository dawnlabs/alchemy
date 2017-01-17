const shell = require('shelljs')

const { exec, which } = shell

export default (files, name) => {
  if (!which('convert')) {
    throw new Error('Sorry, this script requires ImageMagick\'s convert (https://www.imagemagick.org)')
  }

  const command = `convert ${files.join(' ')} ${name || 'file.pdf'}`
  exec(command, (code) => {
    if (code !== 0) throw new Error('Error: convert failed')
  })
}
