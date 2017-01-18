const shell = require('shelljs')

const { exec, which } = shell
const DEFAULT_FILE_NAME = 'CONVERTED.pdf'

const convert = ({ files, outputPath, name }, cb) => {
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

const checkForBrew = () => !!which('brew')
const checkForImageMagick = () => !!which('convert')
const installImageMagick = (cb) => {
  if (!checkForBrew()) {
    cb(7)
  } else if (!checkForImageMagick()) {
    if (confirm('ImageMagick is required to run this app. Install now?')) exec('brew install imagemagick', cb)
    else cb(3)
  } else {
    cb(0)
  }
}

module.exports = {
  convert,
  checkForBrew,
  checkForImageMagick,
  installImageMagick
}
