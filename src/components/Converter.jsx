import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'

import Failed from './svg/Failed'
import Done from './svg/Done'
import Converting from './svg/Converting'
import Idle from './svg/Idle'

import { convert } from '../api'
import { uniqueFiles } from '../helpers/util'

const drop = (props, monitor, component) => {
  const { files } = monitor.getItem()
  component.setState({
    status: 'IDLE',
    files: uniqueFiles(component.state.files, files)
  })

  if (component.state.shifted) {
    component.convert()
  }
}

class Sanitizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'IDLE',
      files: {}
    }

    this.isHover = this.isHover.bind(this)
    this.getIconObject = this.getIconObject.bind(this)
    this.getMessage = this.getMessage.bind(this)
    this.convert = this.convert.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Shift') {
        this.setState({
          shifted: true
        })
      }
    })
    window.addEventListener('keyup', () => {
      this.setState({
        shifted: false
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('keyup')
    window.removeEventListener('keydown')
  }

  getMessage() {
    switch (this.state.status) {
      case 'IDLE': {
        if (!Object.keys(this.state.files).length) {
          return (
            <div>
              <h1>
                { this.isHover() ? 'Drop' : 'Drag & drop' }
              </h1>
              <p className="detail">
                {`your files here to ${this.state.shifted ? 'convert' : 'add them'}`}
              </p>
            </div>
          )
        }
        return null
      }
      case 'CONVERTING': return (
        <div>
          <h1>
            Converting
          </h1>
          <p className="detail">(this should only take a sec)</p>
        </div>
      )
      case 'DONE': return (
        <div>
          <h1>
            Complete!
          </h1>
          <p className="detail">{`${this.state.fileName || 'File'} created`}</p>
        </div>
      )
      case 'FAILED': return (
        <div>
          <h1>
            Conversion failed
          </h1>
          <p className="detail">Uh oh, something went wrong 😕</p>
        </div>
      )
      default: return null
    }
  }

  getIconObject() {
    switch (this.state.status) {
      case 'FAILED': return <Failed />
      case 'DONE': return <Done />
      case 'CONVERTING': return <Converting />
      default:
        if (Object.keys(this.state.files).length) {
          return (
            <div
              className="file__list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                width: '100%',
                height: '100%',
              }}
            >
              <button className="button__convert" onClick={() => { this.convert() }}>CONVERT</button>
              {
                Object.keys(this.state.files).map(key =>
                  <p className="file__list-item" key={key}>{this.state.files[key].name}</p>
                )
              }
            </div>
          )
        }
        return <Idle />
    }
  }

  convert() {
    const filtered = Object.keys(this.state.files)
                           .map(key => this.state.files[key])
                           .filter(file => file.type.includes('image'))

    if (filtered.length) {
      const [ref] = filtered

      // where to place output file
      const outputPath = ref.path.slice(0, ref.path.length - ref.name.length)

      this.setState({
        status: 'CONVERTING'
      })

      convert({
        files: filtered.map(f => f.path),
        outputPath
      }).then((fileName) => {
        this.setState({
          status: 'DONE',
          fileName
        })
        setTimeout(() => {
          this.setState({
            status: 'IDLE',
            files: {},
          })
        }, 3000)
      }).catch((err) => {
        alert(`ERR: ${err}`)
        this.setState({
          status: 'FAILED'
        })
        setTimeout(() => {
          this.setState({
            status: 'IDLE',
            files: {},
          })
        }, 3000)
      })
    } else this.setState({ status: 'IDLE' })
  }

  isHover() {
    return this.props.isOver && this.state.status !== 'CONVERTING'
  }

  render() {
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div
        className={`container ${(this.state.status === 'IDLE') ?
         (this.isHover() ? 'border-hover' : 'border-dashed') : ''}`}
      >
        {this.getIconObject()}
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
