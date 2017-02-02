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

module.exports = {
  convert
}
