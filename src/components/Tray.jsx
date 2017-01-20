import React from 'react'
import Sanitizer from './Sanitizer'

const { lightOrange: ORANGE } = require('../helpers/colors')

const style = {
  backgroundColor: ORANGE,
  width: '100vw',
  height: '100vh',
  display: 'flex'
}
const Tray = () => {
  return (
    <div style={style}>
      <Sanitizer />
    </div>
  )
}

export default Tray
