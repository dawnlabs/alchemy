/* global window alert */
import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import S from 'string'
import { arrayMove } from 'react-sortable-hoc'

import Staging from './Staging'
import Message from './Message'
import Failed from './svg/Failed'
import Done from './svg/Done'
import Converting from './svg/Converting'
import Idle from './svg/Idle'

import { convert, merge } from '../api'
import { notify } from '../helpers/notifier'
import {
  getFileExtension,
  isValidFileType,
  uniqueFiles,
  createOutputFileName,
  filterImages
} from '../helpers/util'
import {
  fileTypes,
  MERGE,
  IDLE,
  STAGING,
  CONVERTING,
  FAILED,
  DONE
} from '../helpers/constants'

const drop = (props, monitor, component) => {
  const { files } = monitor.getItem()
  const stagingFiles = uniqueFiles(component.state.files, files)
    .filter(file =>
      isValidFileType(getFileExtension(file.name).toLowerCase()))
  component.setState({
    status: stagingFiles.length ? STAGING : IDLE,
    files: stagingFiles
  })

  if (component.state.shifted) {
    component.convert()
  }
}

const DEFAULT_STATE = {
  status: IDLE,
  operation: MERGE,
  outputType: 'pdf',
  files: [],
  inputValue: ''
}

class Converter extends Component {
  constructor (props) {
    super(props)

    this.state = DEFAULT_STATE

    this.isHover = this.isHover.bind(this)
    this.getIconObject = this.getIconObject.bind(this)
    this.convert = this.convert.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleOutputTypeChange = this.handleOutputTypeChange.bind(this)
    this.getFileName = this.getFileName.bind(this)
  }

  componentDidMount () {
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

  componentWillUnmount () {
    window.removeEventListener('keyup')
    window.removeEventListener('keydown')
  }

  getFileName () {
    if (!this.state.files.length) return ''

    const filtered = filterImages(this.state.files).map(f => f.path)
    if (this.state.operation === MERGE) {
      if (this.state.inputValue) return S(this.state.inputValue).ensureRight(`.${this.state.outputType}`).s
      return createOutputFileName(this.state.outputType)(filtered)
    }
    const [first] = filtered
    const file = first.split('/').pop()
    const name = file.split('.').shift()
    return `${name}.${this.state.outputType}`
  }

  getIconObject () {
    switch (this.state.status) {
      case FAILED: return <Failed />
      case DONE: return <Done />
      case CONVERTING: return <Converting />
      case STAGING: return (
        <Staging
          files={this.state.files}
          operation={this.state.operation}
          outputType={this.state.outputType}
          inputPlaceholder={this.getFileName()}
          handleOutputTypeChange={this.handleOutputTypeChange}
          onOperationChange={op => this.setState({
            operation: op,
            outputType: fileTypes[op].output[0]
          })}
          onConvertClick={() => { this.convert() }}
          onSortEnd={({ oldIndex, newIndex }) => {
            this.setState({
              files: arrayMove(this.state.files, oldIndex, newIndex)
            })
          }}
          onFileClick={(key) => {
            this.setState({
              files: this.state.files.filter(file => key !== file.path)
            }, () => {
              this.setState({
                status: this.state.files.length ? this.state.status : IDLE
              })
            })
          }}
          inputValue={this.state.inputValue
            ? S(this.state.inputValue).ensureRight(`.${this.state.outputType}`).s
            : ''
          }
          onChange={(e) => {
            if (!e.target.value) return this.setState({ inputValue: null })
            const letters = e.target.value.split('')
            const New = letters.pop()
            return this.setState({
              inputValue: S(letters.join('')).chompRight(`.${this.state.outputType}`).s + New
            })
          }}
        />
      )
      default: return <Idle />
    }
  }

  handleOutputTypeChange (e) {
    this.setState({ outputType: e.target.value })
  }

  convert () {
    const filtered = filterImages(this.state.files)

    if (filtered.length) {
      this.setState({
        status: CONVERTING
      })

      const path = filtered[0].path.slice(0, filtered[0].path.length - filtered[0].name.length)
      const command = this.state.operation === MERGE ? merge : convert
      const fileName = this.getFileName()
      const outputPath = this.state.operation === MERGE
        ? path + fileName
        : path

      command({
        files: filtered.map(f => f.path),
        outputPath,
        outputType: this.state.outputType
      }).then(() => {
        this.setState({
          status: DONE,
          fileName: this.state.operation === MERGE ? fileName : `File${filtered.length > 1 ? 's' : ''}`
        })

        if (document.hidden) {
          notify({ didSucceed: true, operation: this.state.operation})
        }

        setTimeout(() => {
          this.setState(DEFAULT_STATE)
        }, 3000)
      }).catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`ERR: ${err}`)
        this.setState({
          status: FAILED
        })

        if (document.hidden) {
          notify({ didSucceed: false, operation: this.state.operation})
        }

        setTimeout(() => {
          this.setState(DEFAULT_STATE)
        })
      })
    } else this.setState({ status: IDLE })
  }

  isHover () {
    return this.props.isOver && this.state.status !== CONVERTING
  }

  render () {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div
        className={`container ${this.state.status === STAGING ? 'no-padding ' : ''}
          ${(this.state.status === IDLE)
         ? (this.isHover() ? 'border-hover' : 'border-dashed') : ''}`}
      >
        {this.getIconObject()}
        <Message hover={this.isHover()} state={this.state} />
      </div>
    )
  }
}

// { drop } since other functions can be passed here
export default DropTarget(NativeTypes.FILE, { drop }, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
  item: monitor.getItem()
}))(Converter)
