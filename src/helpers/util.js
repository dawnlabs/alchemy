const { pluck, compose, map } = require('./functional')

const replaceSpaceCharacters = str =>
  str.replace(/\s/g, '\\ ')

const concatFiles = files =>
  files.map(path => path.split('/').pop())
       .map(file => file.split('.')[0])
       .map(file => file.substr(0, 10))
       .join('_')
       .replace(/\s/g, '')
       .substr(0, 50)

const filterImages = files => Object.keys(files)
                                    .map(key => files[key])
                                    .filter(file => file.type.includes('image'))

const createOutputFileName = outputType => files => `ALCHEMY-${concatFiles(files)}.${outputType || 'pdf'}`

function centerEllipsis(str, length = 7) {
  return (str.length > (length * 2) + 1) ?
    `${str.substr(0, length)}...${str.substr(str.length - length, str.length)}` :
    str
}

const displayOutputFileName = outputType =>
  compose(filterImages, map(pluck('path')), createOutputFileName(outputType), centerEllipsis)

const uniqueFiles = (files, newArray) =>
  newArray.reduce((accum, next) => {
    if (accum[next.path]) return accum
    return Object.assign(accum, {
      [next.path]: next
    })
  }, files)

const removeByKey = (myObj, deleteKey) => {
  const newObj = Object.assign({}, myObj)
  delete newObj[deleteKey]
  return newObj
}

module.exports = {
  displayOutputFileName,
  centerEllipsis,
  filterImages,
  createOutputFileName,
  concatFiles,
  removeByKey,
  replaceSpaceCharacters,
  uniqueFiles
}
