import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import octicons from 'octicons'

import convert from '../api'

const fileTarget = {
  drop(props, monitor) {
    const { files } = monitor.getItem()
    const images = files.filter(file => file.type.includes('image')).map(f => f.path)

    convert(images)
  }
}

const style = {
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '8px 32px',
  padding: '16px 16px',
  width: 'calc(100% - 64px)',
  height: '100%',
  border: '5px dashed rgb(209, 75, 75)'
}

class Sanitizer extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop, } = this.props
    return connectDropTarget(
      <div
        style={
          Object.assign({}, style, (isOver && canDrop) ? {
            opacity: '1'
          } : {
            opacity: '0.25'
          })
        }
      >
        {!isOver && !canDrop && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
        {!isOver && canDrop && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
        {isOver && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
      </div>
    )
  }
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
  item: monitor.getItem()
}))(Sanitizer)
