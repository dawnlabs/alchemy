const execS = require('child_process').exec

const { replaceSpaceCharacters, concatFiles } = require('./helpers/util')

const convert = ({ files, outputPath, outputType, name }) => {
  // eslint-disable-next-line dot-notation
  process.env['PATH'] = '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'

  return new Promise((resolve, reject) => {
    execS('which convert', (error) => {
      if (error) reject(error)

      const fileString = files.map(replaceSpaceCharacters).join(' ')
      const outputName = name || `ALCHEMY-${concatFiles(files)}.${outputType || 'pdf'}`
      const command = `convert ${fileString} ${outputPath}${outputName}`
      console.log(command)

      execS(command, (error) => {
        if (error) reject(error)
        else resolve(outputName)
      })
    })
  })
}

const installImageMagick = () => {
  return new Promise((resolve, reject) => {
    execS('which brew', (error) => {
      if (error) return reject(new Error('Brew is required to run Alchemy. Please visit https://brew.sh/ to install.'))
      return execS('which convert', (error) => {
        if (error) {
          return execS('brew install imagemagick', (error) => {
            return error ? reject(error) : resolve('ImageMagick is installed.')
          })
        }
        return resolve('ImageMagick already installed.')
      })
    })
  })
}

module.exports = {
  convert,
  installImageMagick
}
