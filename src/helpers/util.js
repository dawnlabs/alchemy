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

const createOutputFileName = (files, outputType) => `ALCHEMY-${concatFiles(files)}.${outputType || 'pdf'}`

const centerEllipsis = str => (
  (str.length > 15) ?
    `${str.substr(0, 7)}...${str.substr(str.length - 7, str.length)}` :
    str
)

// TODO curry?
const displayOutputFileName = (files, outputType) =>
  centerEllipsis(createOutputFileName(filterImages(files).map(f => f.path), outputType))

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
