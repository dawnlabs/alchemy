import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'

const fileTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem().files)
  }
}

class Sanitizer extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props
    return connectDropTarget(
      <div>
        {!isOver && !canDrop && 'Drag files from the hard drive'}
        {!isOver && canDrop && 'Drag the files here'}
        {isOver && 'Drop the files'}
      </div>
    )
  }
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Sanitizer)
