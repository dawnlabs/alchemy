const execa = require('execa')
const fs = require('fs-extra')

let binary = null

const tmpFile = (file) => {
  const tmpName = `/tmp/alchemy/${file.replace(/\s+/g, '')}`
  fs.copySync(file, tmpName)
  return tmpName
}

module.exports = {
  convert ({ files, outputPath, outputType }) {
    const args = [
      'convert',
      '-type', outputType,
      '-out', outputPath,
      ...files.map(tmpFile)
    ]

    return execa(binary, args)
  },

  merge ({ files, outputPath }) {
    const args = [
      'merge',
      '-out', outputPath,
      ...files.map(tmpFile)
    ]

    return execa(binary, args)
  },

  init (appPath) {
    if (process.platform === 'win32') {
      binary = `${appPath}/bin/photosorcery.exe`
    } else {
      binary = `${appPath}/bin/photosorcery`
    }
  }
}
