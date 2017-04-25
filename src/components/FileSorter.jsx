import React from 'react'
import Cancel from './svg/Cancel'

const { SortableContainer, SortableElement, SortableHandle } = require('react-sortable-hoc')

const DragHandle = SortableHandle(() => <span>::</span>)

const Item = SortableElement(({ value, onClose }) => (
  <div className="file-list__item">
    <DragHandle />
    <div>{value}</div>
    <button className="close-btn" onClick={onClose} >
      <Cancel />
    </button>
  </div>
))

const Container = SortableContainer(({ files, onClick }) => (
  <div className="file-list">
    {
      files.map((file, index) => (
        <Item
          value={file.name}
          key={file.path}
          onClose={() => {
            onClick(file.path)
          }}
          index={index}
        />
      ))
    }
  </div>
))

const FileSorter = ({ files, onClick, onSortEnd }) => (
  <Container files={files} onClick={onClick} onSortEnd={onSortEnd} useDragHandle />
)

export default FileSorter
