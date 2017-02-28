import React from 'react'
import Converter from './Converter'

const style = {
  width: '100vw',
  height: '100vh',
  display: 'flex'
}

const Tray = () => {
  return (
    <div style={style}>
      <Converter />
    </div>
  )
}

export default Tray
