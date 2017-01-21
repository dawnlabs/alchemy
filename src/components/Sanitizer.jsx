import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import Octicon from './Octicon'

import { convert } from '../api'

const {
  lightBlue: LIGHT_BLUE,
  blue: BLUE,
  offwhite,
  black: BLACK,
  transBlack,
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
    border: `5px dotted ${LIGHT_BLUE}`,
    borderRadius: '8px'
  },

  title: {
    textAlign: 'center',
    margin: '0'
  },

  detail: {
    color: transBlack
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
        <div>
          <h1 style={style.title}>Drag & drop</h1>
          <p>your files here to convert</p>
          <detail>(<code>⌘-8</code> to toggle view)</detail>
        </div>

      )
      case 'FAILED': return (
        <h6 style={Object.assign(style.title, { color: BLACK })}>
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
            fill: BLUE
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
        <svg className="files" viewBox="0 0 107 56" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs><path d="M0 2.997A2.994 2.994 0 0 1 3.002 0h23.171c.833 0 1.978.487 2.554 1.083l8.227 8.512c.578.598 1.046 1.748 1.046 2.576v34.825A3.008 3.008 0 0 1 35.002 50H2.998A2.994 2.994 0 0 1 0 47.003V2.997z" id="a" />
                <mask id="h" x="0" y="0" width="38" height="50" fill="#fff"><use xlinkHref="#a" /></mask><path d="M0 2.997A2.994 2.994 0 0 1 3.002 0h23.171c.833 0 1.508.668 1.508 1.507V8.67c0 1.11.898 2.008 2.002 2.008H36.5c.828 0 1.5.666 1.5 1.494v34.825A3.008 3.008 0 0 1 35.002 50H2.998A2.994 2.994 0 0 1 0 47.003V2.997z" id="b" />
                <mask id="i" x="0" y="0" width="38" height="50" fill="#fff"><use xlinkHref="#b" /></mask><path id="c" d="M11 19h16v16H11z" />
                <mask id="j" x="0" y="0" width="16" height="16" fill="#fff"><use xlinkHref="#c" /></mask><path d="M0 2.997A2.994 2.994 0 0 1 3.002 0h23.171c.833 0 1.978.487 2.554 1.083l8.227 8.512c.578.598 1.046 1.748 1.046 2.576v34.825A3.008 3.008 0 0 1 35.002 50H2.998A2.994 2.994 0 0 1 0 47.003V2.997z" id="d" />
                <mask id="k" x="0" y="0" width="38" height="50" fill="#fff"><use xlinkHref="#d" /></mask><path d="M0 2.997A2.994 2.994 0 0 1 3.002 0h23.171c.833 0 1.508.668 1.508 1.507V8.67c0 1.11.898 2.008 2.002 2.008H36.5c.828 0 1.5.666 1.5 1.494v34.825A3.008 3.008 0 0 1 35.002 50H2.998A2.994 2.994 0 0 1 0 47.003V2.997z" id="e" />
                <mask id="l" x="0" y="0" width="38" height="50" fill="#fff"><use xlinkHref="#e" /></mask><path d="M0 2.997A2.994 2.994 0 0 1 3.002 0h23.171c.833 0 1.978.487 2.554 1.083l8.227 8.512c.578.598 1.046 1.748 1.046 2.576v34.825A3.008 3.008 0 0 1 35.002 50H2.998A2.994 2.994 0 0 1 0 47.003V2.997z" id="f" />
                <mask id="m" x="0" y="0" width="38" height="50" fill="#fff"><use xlinkHref="#f" /></mask><path d="M0 2.997A2.994 2.994 0 0 1 3.002 0h23.171c.833 0 1.508.668 1.508 1.507V8.67c0 1.11.898 2.008 2.002 2.008H36.5c.828 0 1.5.666 1.5 1.494v34.825A3.008 3.008 0 0 1 35.002 50H2.998A2.994 2.994 0 0 1 0 47.003V2.997z" id="g" />
                <mask id="n" x="0" y="0" width="38" height="50" fill="#fff"><use xlinkHref="#g" /></mask>
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="rotate(11 36.422 369.218)">
                    <g stroke="#F0F0EC" strokeWidth="3" fill="#FFF"><use mask="url(#h)" xlinkHref="#a" /><use mask="url(#i)" xlinkHref="#b" /></g><use stroke="#F58D24" mask="url(#j)" strokeWidth="6" opacity=".896" xlinkHref="#c" /></g>
                <g transform="rotate(-11 36.578 5.73)" strokeWidth="3">
                    <g stroke="#F0F0EC" fill="#FFF"><use mask="url(#k)" xlinkHref="#d" /><use mask="url(#l)" xlinkHref="#e" /></g><circle stroke="#B8E5FF" opacity=".896" cx="19" cy="27" r="7" /></g>
                <g strokeWidth="3">
                    <g stroke="#F0F0EC" fill="#FFF" transform="translate(35)"><use mask="url(#m)" xlinkHref="#f" /><use mask="url(#n)" xlinkHref="#g" /></g><path stroke="#80C772" opacity=".896" d="M54.43 21l7.43 12.038H47z" /></g>
            </g>
        </svg>
      )
    }
  }

  render() {
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div
        style={
          Object.assign({}, style.container, (isOver && this.state.status !== 'CONVERTING') ? {
            borderColor: LIGHT_BLUE,
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
