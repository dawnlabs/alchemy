const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')
const tmp = require('tmp')

let binary = null

const copyToDir = (dir, filePath) => {
  const { base } = path.parse(filePath)
  const newFilePath = path.join(dir, base.replace(/\s+/g, ''))

  fs.copySync(filePath, newFilePath)

  return newFilePath
}

const renameWithPrefix = (filePath, index) => {
  const { dir, ext } = path.parse(filePath)
  const newPath = path.join(dir, `${index}${ext}`)

  fs.renameSync(filePath, newPath)

  return newPath
}

const isNonstandardFormat = extension => !['.gif', '.jpeg', '.jpg', '.png'].includes(extension.toLowerCase())

module.exports = {
  async convert ({ files, outputPath, outputType }) {
    const tmpDir = tmp.dirSync().name
    const tmpFiles = files.map(copyToDir.bind(null, tmpDir))

    const args = [
      'convert',
      '-type', outputType,
      '-out', outputPath,
      ...tmpFiles
    ]

    try {
      await execa(binary, args)
    } finally {
      fs.remove(tmpDir)
    }
  },

  async merge ({ files, outputPath }) {
    const tmpDir = tmp.dirSync().name
    let tmpFiles = files.map(copyToDir.bind(null, tmpDir))

    const extensions = tmpFiles.map(path.extname)
    if (extensions.some(isNonstandardFormat)) {
      // convert to filetypes that photosorcery merge can handle
      const normalizedDir = path.join(tmpDir, 'normalized')
      fs.mkdirSync(normalizedDir)
      tmpFiles = tmpFiles.map(renameWithPrefix)

      const args = [
        'convert',
        '-type', 'png',
        '-out', normalizedDir,
        ...tmpFiles
      ]

      await execa(binary, args)

      tmpFiles = fs.readdirSync(normalizedDir).map(base => path.join(normalizedDir, base))
    }

    const args = [
      'merge',
      '-out', outputPath,
      ...tmpFiles
    ]

    try {
      await execa(binary, args)
    } finally {
      fs.remove(tmpDir)
    }
  },

  init (appPath) {
    const basePath = path.join(appPath, 'bin', 'photosorcery')

    switch (process.platform) {
      case 'win32':
        binary = path.join(basePath, 'photosorcery-windows.exe')
        break
      case 'linux':
        binary = path.join(basePath, 'photosorcery-linux')
        break
      default:
        binary = path.join(basePath, 'photosorcery-darwin')
        break
    }
  }
}
