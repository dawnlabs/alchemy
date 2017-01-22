const { exec, which } = require('shelljs')
const md5 = require('md5')

const { replaceSpaceCharacters } = require('./helpers/util')

const convert = ({ files, outputPath, name }) => {
  if (!which('convert')) {
    throw new Error('Sorry, this script requires ImageMagick\'s convert (https://www.imagemagick.org)')
  }

  return new Promise((resolve, reject) => {
    const fileString = files.map(replaceSpaceCharacters).join(' ')
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
const installImageMagick = () => {
  if (!checkForBrew()) return Promise.resolve(-1)

  if (!checkForImageMagick()) {
    if (confirm('ImageMagick is required to run this app. Install now?')) {
      return new Promise((resolve) => {
        exec('brew install imagemagick', (code) => {
          resolve(code)
        })
      })
    }
  }

  return Promise.resolve(0)
}

module.exports = {
  convert,
  checkForBrew,
  checkForImageMagick,
  installImageMagick
}
