const blue = 'rgba(130, 221, 240, 1)'
const lightBlue = '#bae5fe'
const offwhite = '#fefeff'
const red = 'rgb(209, 75, 75)'
const black = 'rgba(0,0,0,1)'
const transBlack = 'rgba(0,0,0, 0.25)'
const green = 'rgb(132, 255, 144)'
const grey = '#F0F0EC'
const orange = '#ee9a4c'
const lightOrange = '#efb47c'

const MERGE = 'MERGE'
const CONVERT = 'CONVERT'
module.exports = {
  STAGING: 'STAGING',
  IDLE: 'IDLE',
  CONVERTING: 'CONVERTING',
  DONE: 'DONE',
  FAILED: 'FAILED',
  MERGE,
  CONVERT,
  fileTypes: {
    [CONVERT]: ['jpg', 'png', 'bmp', 'tiff'],
    [MERGE]: ['pdf', 'gif']
  },
  blue,
  lightBlue,
  offwhite,
  red,
  black,
  transBlack,
  grey,
  green,
  orange,
  lightOrange
}
