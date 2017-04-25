import React from 'react'
import Cancel from './svg/Cancel'

const { SortableContainer, SortableElement } = require('react-sortable-hoc')

const Item = SortableElement(({ key, value, onClick }) =>
  <div className="file-list__item" key={key}>
    <div>{value}</div>
    <button className="close-btn" onClick={() => onClick(key)}>
      <Cancel />
    </button>
  </div>
)

const Container = SortableContainer(({ files, onClick }) => (
  <div className="file-list">
    {
      files.map((file, index) => (
        <Item value={file.name} key={file.path} index={index} onClick={onClick} />
      ))
    }
  </div>
))

const FileSorter = ({ files, onClick, onSortEnd }) => (
  <Container files={files} onClick={onClick} onSortEnd={onSortEnd} />
)

export default FileSorter
