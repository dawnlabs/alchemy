const execa = require('execa')

const { replaceSpaceCharacters } = require('./helpers/util')

const binary = './bin/photosorcery'

const convert = ({ files, outputPath, outputType }) => {
  const args = [
    'convert',
    '-type', outputType,
    '-out', outputPath,
    ...files.map(replaceSpaceCharacters)
  ]

  return execa(binary, args)
}

const merge = ({ files, outputPath }) => {
  const args = [
    'merge',
    '-out', outputPath,
    ...files.map(replaceSpaceCharacters)
  ]

  return execa(binary, args)
}

module.exports = {
  convert,
  merge
}
