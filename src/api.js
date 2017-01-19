const shell = require('shelljs')
const md5 = require('md5')

const { exec, which } = shell

const convert = ({ files, outputPath, name }) => {
  if (!which('convert')) {
    throw new Error('Sorry, this script requires ImageMagick\'s convert (https://www.imagemagick.org)')
  }

  return new Promise((resolve, reject) => {
    const fileString = files.join(' ')
    const command = `convert ${fileString} ${outputPath}${name || `ALCHEMY-${md5(fileString).substr(0, 6)}.pdf`}`
    console.log(command)

    exec(command, (code) => {
      if (code !== 0) reject(code)
      else resolve(code)
    })
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
