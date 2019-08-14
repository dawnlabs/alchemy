import React from 'react'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'

import Cancel from './svg/Cancel'

const DragHandle = sortableHandle(() => <div className="drag-handle" />)

const Item = sortableElement(({ value, onClose }) => (
  <div style={{ backgroundColor: '#fff', zIndex: 999 }} className="file-list__item">
    <DragHandle />
    <div className="file-name">{value}</div>
    <button className="close-btn" onClick={onClose}>
      <Cancel />
    </button>
  </div>
))

const Container = sortableContainer(({ files, onClick }) => (
  <div className="file-list">
    {files.map((file, index) => (
      <Item
        value={file.name}
        key={file.path}
        onClose={() => {
          onClick(file.path)
        }}
        index={index}
      />
    ))}
  </div>
))

const FileSorter = ({ files, onClick, onSortEnd }) => (
  <Container
    files={files}
    onClick={onClick}
    onSortEnd={onSortEnd}
    useDragHandle
    helperClass="file-list__item"
    lockAxis="y"
    lockToContainerEdges
  />
)

export default FileSorter
