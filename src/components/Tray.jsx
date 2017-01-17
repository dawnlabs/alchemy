import React from 'react'
import Sanitizer from './Sanitizer'

const style = {
  backgroundColor: '#fcff7b',
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
