const { pluck, compose, map } = require('./functional')
const { fileTypes } = require('./constants')

const replaceSpaceCharacters = str =>
  str.replace(/\s/g, '\\ ')

const concatFiles = files =>
  files.map(path => path.split('/').pop())
       .map(file => file.split('.')[0])
       .map(file => file.substr(0, 10))
       .join('_')
       .replace(/\s/g, '')
       .substr(0, 50)

const filterImages = files => files.filter(file => file.type.includes('image'))

const createOutputFileName = outputType => files => `ALCHEMY-${concatFiles(files)}.${outputType || 'pdf'}`

function centerEllipsis(str, length = 7) {
  return (str.length > (length * 2) + 1) ?
    `${str.substr(0, length)}...${str.substr(str.length - length, str.length)}` :
    str
}

const displayOutputFileName = outputType =>
  compose(filterImages, map(pluck('path')), createOutputFileName(outputType), centerEllipsis)

const fileTypesArr = [].concat(...(Object.keys(fileTypes).map(key => fileTypes[key])))

const isValidFileType = fileType => fileTypesArr.indexOf(fileType.toLowerCase()) > -1

const getFileType = fileName => fileName.split('.').pop()

const uniqueFiles = (files, newArray) => {
  return files.concat(
    newArray
      .filter(file => !files.map(file => file.path).includes(file.path))
  )
}

module.exports = {
  displayOutputFileName,
  centerEllipsis,
  filterImages,
  createOutputFileName,
  concatFiles,
  replaceSpaceCharacters,
  uniqueFiles,
  isValidFileType,
  getFileType
}
