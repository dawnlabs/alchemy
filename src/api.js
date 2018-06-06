const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')

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
    const basePath = path.join(appPath, 'bin', 'photosorcery') 

    switch (process.platform) {
      case 'win32':
        binary = path.join(basePath, 'photosorcery-windows.exe')
        break
      case 'darwin':
        binary = path.join(basePath, 'photosorcery-darwin')
        break
      case 'linux':
        binary = path.join(basePath, 'photosorcery-linux')
        break
    }
  }
}