const replaceSpaceCharacters = str =>
  str.replace(/\s/g, '\\ ')

const concatFiles = files =>
  files.map(path => path.split('/').pop())
       .map(file => file.split('.')[0])
       .map(file => file.substr(0, 10))
       .join('_')
       .replace(/\s/g, '')
       .substr(0, 50)

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
  concatFiles,
  removeByKey,
  replaceSpaceCharacters,
  uniqueFiles
}
