function replaceSpaceCharacters(str) {
  return str.replace(/\s/g, '\\ ')
}

const uniqueFiles = (files, newArray) =>
  newArray.reduce((accum, next) => {
    if (accum[next.path]) return accum
    return Object.assign(accum, {
      [next.path]: next
    })
  }, files)

module.exports = {
  replaceSpaceCharacters,
  uniqueFiles
}
