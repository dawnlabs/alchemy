const execa = require('execa')

const { replaceSpaceCharacters } = require('./helpers/util')

let binary = null

module.exports = {
  convert ({ files, outputPath, outputType }) {
    console.log(binary)
    const args = [
      'convert',
      '-type', outputType,
      '-out', outputPath,
      ...files.map(replaceSpaceCharacters)
    ]

    return execa(binary, args)
  },

  merge ({ files, outputPath }) {
    const args = [
      'merge',
      '-out', outputPath,
      ...files.map(replaceSpaceCharacters)
    ]

    return execa(binary, args)
  },

  init (mb) {
    binary = `${mb.app.getAppPath()}/bin/photosorcery`
    console.log(binary)
  }
}
