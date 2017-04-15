import React from 'react'
import S from 'string'

import ArrowDown from './svg/ArrowDown'
import Cancel from './svg/Cancel'
import Merge from './svg/Merge'
import Convert from './svg/Convert'

import { centerEllipsis } from '../helpers/util'
import {
  fileTypes,
  CONVERT,
  MERGE
} from '../helpers/constants'

const mapOperationToComp = key => ({
  [CONVERT]: <Convert />,
  [MERGE]: <Merge />
}[key])

class Staging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  render () {
    const {
      files,
      operation,
      outputType,
      inputPlaceholder,
      handleOutputTypeChange,
      onOperationChange,
      onConvertClick,
      onFileClick
    } = this.props
    return (
      <div className="staging">
        {/* TODO make this compose better */}
        <label htmlFor="outputFileName">FILENAME</label>
        <input
          id="outputFileName"
          type="text"
          disabled={this.state.operation === CONVERT}
          placeholder={centerEllipsis(inputPlaceholder)}
          value={this.state.inputValue ? S(this.state.inputValue).ensureRight(`.${outputType}`).s : ''}
          onChange={(e) => {
            if (!e.target.value) return this.setState({ inputValue: null })
            const letters = e.target.value.split('')
            const New = letters.pop()
            return this.setState({
              inputValue: S(letters.join('')).chompRight(`.${outputType}`).s + New
            })
          }}
        />
        <label htmlFor="switch">ACTION</label>
        <div className="row">
          <div className="switch">
            {
              Object.keys(fileTypes).map(op => (
                <button
                  key={op}
                  className={`switch__btn merge ${operation === op ? 'switch__btn-active' : ''}`}
                  onClick={() => onOperationChange(op)}
                >
                  {mapOperationToComp(op)}
                  <div>{`${op.charAt(0)}${op.slice(1).toLowerCase()}`}</div>
                </button>
              ))
            }
          </div>
          <div className="dropdown">
            <select name="file-type" value={outputType} onChange={handleOutputTypeChange}>
              {
                fileTypes[operation].map(type => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))
              }
            </select>
            <ArrowDown />
          </div>
        </div>
        <label htmlFor="file-list">FILES</label>
        <div className="file-list">
          {
            Object.keys(files).map(key =>
              <div className="file-list__item" key={key}>
                <div>{files[key].name}</div>
                <button className="close-btn" onClick={() => onFileClick(key)}>
                  <Cancel />
                </button>
              </div>
            )
          }
        </div>
        <button className="button__convert" onClick={onConvertClick}>{operation}</button>
      </div>
    )
  }
}

export default Staging
