const execa = require('execa')
const path = require('path')

const { replaceSpaceCharacters, createOutputFileName } = require('./helpers/util')

const binary = './bin/photosorcery'

const convert = ({files, outputPath, outputType}) => {
  let args = [
    'convert',
    '-type', outputType,
    '-out', outputPath,
    ...files.map(replaceSpaceCharacters)
  ]

  return execa(binary, args)
}

const merge = ({files, outputPath}) => {
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
