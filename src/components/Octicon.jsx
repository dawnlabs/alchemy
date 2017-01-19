import React from 'react'
import octicons from 'octicons'

const Octicon = ({ style, type, height, width, className }) => (
  <div
    style={style}
    dangerouslySetInnerHTML={{ __html: octicons[type].toSVG({ width, height: height || width }) }}
    className={className}
  />
)

export default Octicon
