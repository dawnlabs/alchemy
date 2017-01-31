const { exec, which } = require('shelljs')
const md5 = require('md5')
const execS = require('child_process').exec

const { replaceSpaceCharacters } = require('./helpers/util')

const convert = ({ files, outputPath, name }) => {
  process.env['PATH'] = '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'

  return new Promise((resolve, reject) => {
    execS('which convert', (error, stdout, stderr) => {
      if (error) reject(error)
      else {
        const fileString = files.map(replaceSpaceCharacters).join(' ')
        const outputName = name || `ALCHEMY-${md5(fileString).substr(0, 6)}.pdf`
        const command = `convert ${fileString} ${outputPath}${outputName}`
        console.log(command)

        execS(command, (error) => {
          if (error) reject(error)
          else resolve(outputName)
        })
      }
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
