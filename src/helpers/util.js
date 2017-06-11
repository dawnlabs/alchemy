const path = require('path')
const { pluck, compose, map } = require('./functional')
const { fileTypes } = require('./constants')

const replaceSpaceCharacters = str =>
  str.replace(/\s/g, '\\ ')
     .replace(/'/g, '\\\'')

const concatFiles = files =>
  files.map(path => path.split('/').pop())
       .map(file => path.basename(file, path.extname(file)))
       .join('_')
       .substr(0, 50)

const filterImages = files => files.filter(file => file.type.includes('image'))

const createOutputFileName = outputType =>
  files => `ALCHEMY-${concatFiles(files)}.${outputType || 'pdf'}`

function centerEllipsis(str, length = 7) {
  return (str.length > (length * 2) + 1)
    ? `${str.substr(0, length)}...${str.substr(str.length - length, str.length)}`
    : str
}

const displayOutputFileName = outputType =>
  compose(
    filterImages,
    map(pluck('path')),
    createOutputFileName(outputType),
    centerEllipsis
  )

const inputTypeSet = Object.keys(fileTypes)
  .reduce((types, action) =>
    new Set([...types, ...fileTypes[action].input]),
    new Set()) // start with empty Set

const isValidFileType = fileType => inputTypeSet.has(fileType)

const getFileExtension = fileName => fileName.split('.').pop()

const uniqueFiles = (files, newArray) =>
  files.concat(
    newArray.filter(file =>
      !files.map(file => file.path).includes(file.path)))

module.exports = {
  displayOutputFileName,
  centerEllipsis,
  filterImages,
  createOutputFileName,
  concatFiles,
  replaceSpaceCharacters,
  uniqueFiles,
  isValidFileType,
  getFileExtension
}
