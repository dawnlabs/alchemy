const shell = require('shelljs')

const { exec, which } = shell

const DEFAULT_FILE_NAME = 'CONVERTED.pdf'

export default ({ files, outputPath, name }, cb) => {
  if (!which('convert')) {
    throw new Error('Sorry, this script requires ImageMagick\'s convert (https://www.imagemagick.org)')
  }

  const command = `convert ${files.join(' ')} ${outputPath}${name || DEFAULT_FILE_NAME}`
  console.log(command)

  exec(command, (code) => {
    if (code !== 0) {
      cb(code)
    } else {
      cb(null)
    }
  })
}
