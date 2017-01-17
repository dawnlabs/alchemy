import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'

const fileTarget = {
  drop(props, monitor) {
    const { files } = monitor.getItem()
    console.log(`convert ${files.map(f => f.path).join(' ')} file.pdf`)
  }
}

const style = {
  background: 'grey',
  margin: '0',
  padding: '16px 24px',
  width: '100%',
  height: '50px'
}

class Sanitizer extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop, itemType, item } = this.props
    return connectDropTarget(
      <div style={style}>
        {!isOver && !canDrop && 'Grab an image file'}
        {!isOver && canDrop && 'Drag your file to convert to PDF'}
        {isOver && 'Drop'}
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
