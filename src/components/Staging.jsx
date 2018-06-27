import React from 'react'

import ArrowDown from './svg/ArrowDown'
import Merge from './svg/Merge'
import Convert from './svg/Convert'
import Settings from './svg/Settings'
import FileSorter from './FileSorter'
import settingsMenu from '../helpers/menu'

import { centerEllipsis, getUniqueExtensions } from '../helpers/util'
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
      onFileClick,
      onSortEnd,
      onChange,
      inputValue,
    } = this.props

    // Remove file types for current file, only works for one file
    const visibleFileTypes = Object.keys(fileTypes)
      .reduce((visibleTypes, action) =>
        // grab output types from supported types
        Object.assign({ [action]: fileTypes[action].output }, visibleTypes), {})

    const notSameExt = currExt => !getUniqueExtensions(files).includes(currExt.toUpperCase())
    visibleFileTypes[CONVERT] = visibleFileTypes[CONVERT].filter(notSameExt)

    return (
      <div className="staging">
        <button className="button__settings" onClick={() => settingsMenu.popup()}>
          <Settings />
        </button>
        <label htmlFor="outputFileName">FILENAME</label>
        <input
          id="outputFileName"
          type="text"
          disabled={operation === CONVERT}
          placeholder={centerEllipsis(inputPlaceholder)}
          value={inputValue}
          onChange={onChange}
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
                visibleFileTypes[operation].map(type => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))
              }
            </select>
            <ArrowDown />
          </div>
        </div>
        <label htmlFor="file-list">FILES</label>
        <FileSorter
          files={files}
          onClick={onFileClick}
          onSortEnd={onSortEnd}
        />
        <button className="button__convert" onClick={onConvertClick}>{operation}</button>
      </div>
    )
  }
}

export default Staging
