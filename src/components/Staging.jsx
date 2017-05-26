import React from 'react'

import ArrowDown from './svg/ArrowDown'
import Merge from './svg/Merge'
import Convert from './svg/Convert'
import FileSorter from './FileSorter'

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
      onFileClick,
      onSortEnd,
      onChange,
      inputValue,
    } = this.props

    // Remove file types for current file
    // Only works for one file

    var fileTypesCopy = {
      [CONVERT]: [],
      [MERGE]: []
    }
    fileTypesCopy[CONVERT] = fileTypes[CONVERT].slice()
    fileTypesCopy[MERGE] = fileTypes[MERGE].slice()

    if (files.length == 1) {
      for (var i = 0; i < fileTypesCopy[CONVERT].length; i++) {
        var fileArr = files[0].name.split('.')
        var extension = fileArr[fileArr.length-1]
        if (extension.toUpperCase() == fileTypesCopy[CONVERT][i].toUpperCase()) {
          var index = fileTypesCopy[CONVERT].indexOf(fileTypesCopy[CONVERT][i])
          fileTypesCopy[CONVERT].splice(index, 1)
        }
      }
    }

    // End

    return (
      <div className="staging">
        {/* TODO make this compose better */}
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
                fileTypesCopy[operation].map(type => (
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
