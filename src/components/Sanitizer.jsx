import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import Octicon from './Octicon'

import { convert } from '../api'

const {
  lightBlue: BLUE,
  offwhite,
  black: BLACK,
  transBlack,
  green: GREEN,
  transGrey,
} = require('../helpers/colors')

const drop = (props, monitor, component) => {
  const { files } = monitor.getItem()
  const filtered = files.filter(file => file.type.includes('image'))

  if (filtered.length) {
    const [ref] = filtered

    // where to place output file
    const outputPath = ref.path.slice(0, ref.path.length - ref.name.length)

    component.setState({
      status: 'CONVERTING'
    })

    convert({
      files: filtered.map(f => f.path),
      outputPath
    }).then(() => {
      component.setState({
        status: 'DONE'
      })
      setTimeout(() => {
        component.setState({
          status: 'IDLE'
        })
      }, 2000)
    }).catch(() => {
      component.setState({
        status: 'FAILED'
      })
      setTimeout(() => {
        component.setState({
          status: 'IDLE'
        })
      }, 2000)
    })
  } else component.setState({ status: 'IDLE' })
}

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '15px',
    padding: '15px',
    width: 'calc(100% - 30px)',
    height: `calc(${100 / 1}% - 30px)`,
    backgroundColor: offwhite,
    border: `5px dotted ${BLUE}`,
    borderRadius: '8px'
  },

  h6: {
    color: transBlack,
    textAlign: 'center',
    margin: '0',
    fontFamily: 'San Francisco, BlinkMacSystemFont, -apple-system, Helvetica Neue, Helvetica, sans-serif'
  }
}

class Sanitizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'IDLE'
    }
    this.getIconObject = this.getIconObject.bind(this)
    this.getMessage = this.getMessage.bind(this)
  }

  getMessage() {
    switch (this.state.status) {
      case 'IDLE': return (
        <h6 style={style.h6}>
          Drop Items Here
          <br /><br />
          (<code>⌘-8</code> to toggle view)
        </h6>
      )
      case 'FAILED': return (
        <h6 style={Object.assign(style.h6, { color: BLACK })}>
          Failed to convert your pictures 😕
        </h6>
      )
      default: return null
    }
  }

  getIconObject() {
    const { isOver } = this.props
    switch (this.state.status) {
      case 'FAILED': return (
        <Octicon
          style={{
            fill: BLACK
          }}
          type="thumbsdown"
          width={60}
        />
      )
      case 'DONE': return (
        <Octicon
          style={{
            fill: GREEN
          }}
          type="thumbsup"
          width={60}
        />
      )
      case 'CONVERTING': return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Octicon
            style={{
              fill: BLACK
            }}
            type="file-media"
            width={40}
          />
          <Octicon
            style={{
              fill: BLACK
            }}
            className="animated-pulse"
            type="chevron-right"
            width={40}
          />
          <Octicon
            style={{
              fill: BLACK
            }}
            type="file-pdf"
            width={40}
          />
        </div>
      )
      default: return (
        <Octicon
          style={(isOver) ? {
            fill: BLUE
          } : {
            fill: transBlack
          }}
          type="diff"
          width={60}
        />
      )
    }
  }

  render() {
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div
        style={
          Object.assign({}, style.container, (isOver && this.state.status !== 'CONVERTING') ? {
            borderColor: BLUE,
            borderStyle: 'solid'
          } : {
            borderColor: transGrey,
            borderStyle: 'dotted'
          })
        }
      >
        {this.getIconObject(isOver)}
        {this.getMessage()}
      </div>
    )
  }
}

// {!isOver && !canDrop && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
// {!isOver && canDrop && }
// {isOver && }

// { drop } since other functions can be passed here
export default DropTarget(NativeTypes.FILE, { drop }, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
  item: monitor.getItem()
}))(Sanitizer)
