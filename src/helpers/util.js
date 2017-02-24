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

const removeByKey = (myObj, deleteKey) =>
  Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current]
      return result
    }, {})

module.exports = {
  concatFiles,
  removeByKey,
  replaceSpaceCharacters,
  uniqueFiles
}
