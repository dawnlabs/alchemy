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
    const tmpFiles = files.map(tmpFile)
    const args = [
      'convert',
      '-type', outputType,
      '-out', outputPath,
      ...tmpFiles
    ]

    return execa(binary, args)
      .then(() => fs.remove('/tmp/alchemy'))
  },

  merge ({ files, outputPath }) {
    const tmpFiles = files.map(tmpFile)
    const args = [
      'merge',
      '-out', outputPath,
      ...tmpFiles
    ]

    return execa(binary, args)
      .then(() => fs.remove('/tmp/alchemy'))
  },

  init (appPath) {
    if (process.platform === 'win32') {
      binary = `${appPath}/bin/photosorcery.exe`
    } else {
      binary = `${appPath}/bin/photosorcery`
    }
  }
}
