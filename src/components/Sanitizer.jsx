import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import octicons from 'octicons'

import convert from '../api'

const fileTarget = {
  drop(props, monitor, component) {
    const { files } = monitor.getItem()
    const images = files.filter(file => file.type.includes('image')).map(f => f.path)

    if (images.length) {
      component.setState({
        status: 'CONVERTING'
      })
      console.log('Converting...')
      convert(images, () => {
        component.setState({
          status: 'IDLE'
        })
        console.log('Done.')
      })
    } else {
      component.setState({
        status: 'IDLE'
      })
    }
  }
}

const style = {
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '16px 32px',
  padding: '16px 16px',
  width: 'calc(100% - 64px)',
  height: '100%',
  border: '5px dashed rgb(209, 75, 75)',
  opacity: '0.25'
}

class Sanitizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'IDLE'
    }
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props
    return connectDropTarget(
      <div
        style={
          Object.assign({}, style, (isOver && this.state.status !== 'CONVERTING') ? {
            opacity: '1'
          } : {
            opacity: '0.25'
          })
        }
      >
        {
          (this.state.status === 'CONVERTING') ?
            <div
              className="rotate"
              dangerouslySetInnerHTML={{ __html: octicons.sync.toSVG({ width: 100, height: 100 }) }}
            /> :
            <div
              dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100, height: 100 }) }}
            />
        }
      </div>
    )
  }
}

// {!isOver && !canDrop && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
// {!isOver && canDrop && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
// {isOver && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
  item: monitor.getItem()
}))(Sanitizer)
