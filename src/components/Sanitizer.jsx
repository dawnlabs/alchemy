import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import Octicon from './Octicon'

import convert from '../api'

const fileTarget = {
  drop(props, monitor, component) {
    const { files } = monitor.getItem()
    const filtered = files.filter(file => file.type.includes('image'))

    if (filtered.length) {
      const [ref] = filtered
      const outputPath = ref.path.slice(0, ref.path.length - ref.name.length)

      component.setState({
        status: 'CONVERTING'
      })

      convert({
        files: filtered.map(f => f.path),
        outputPath
      }, (code) => {
        if (code) {
          component.setState({
            status: 'FAILED'
          })
        } else {
          component.setState({
            status: 'DONE'
          })
        }
        setTimeout(() => {
          component.setState({
            status: 'IDLE'
          })
        }, 2000)
      })
    } else {
      component.setState({
        status: 'IDLE'
      })
    }
  }
}

const color = 'rgba(130, 221, 240, 1)'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '16px 32px 0px',
    padding: '16px 16px',
    width: 'calc(100% - 64px)',
    height: `calc(${100 / 1}% - 32px)`,
    backgroundColor: '#fefeff',
    border: `5px dotted ${color}`, // rgb(209, 75, 75)',
    borderRadius: '8px'
  },

  h6: {
    color: 'rgba(0,0,0, 0.25)',
    margin: '8px 0 0',
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
      case 'IDLE': return <h6 style={style.h6}>Drop Items Here</h6>
      case 'FAILED': return (
        <h6 style={Object.assign(style.h6, { color: 'rgba(0,0,0,1)' })}>
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
            fill: 'rgb(0, 0, 0)'
          }}
          type="thumbsdown"
          width={100}
        />
      )
      case 'DONE': return (
        <Octicon
          style={{
            fill: 'rgb(132, 255, 144)'
          }}
          type="thumbsup"
          width={100}
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
              fill: 'rgb(0, 0, 0)'
            }}
            type="file-media"
            width={40}
          />
          <div className="DNA_cont">
            <div className="nucleobase" />
            <div className="nucleobase" />
            <div className="nucleobase" />
            <div className="nucleobase" />
            <div className="nucleobase" />
            <div className="nucleobase" />
            <div className="nucleobase" />
            <div className="nucleobase" />
          </div>
          <Octicon
            style={{
              fill: 'rgb(0, 0, 0)'
            }}
            type="file-pdf"
            width={40}
          />
        </div>
      )
      default: return (
        <Octicon
          style={(isOver) ? {
            fill: color
          } : {
            fill: 'rgba(0,0,0,0.25)'
          }}
          type="diff"
          width={100}
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
            borderColor: 'rgba(130, 221, 240, 1)',
            borderStyle: 'solid'
          } : {
            borderColor: 'rgba(130, 221, 240, 0.25)',
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
// {!isOver && canDrop && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
// {isOver && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
  item: monitor.getItem()
}))(Sanitizer)
