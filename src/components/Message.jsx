import React from 'react'

const Message = ({ hover, state }) => {
  switch (state.status) {
    case 'IDLE': return (
      <div>
        <h1>
          { hover ? 'Drop' : 'TEST' }
        </h1>
        <p className="detail">
          {`your files here to ${state.shifted ? 'convert' : 'add them'}`}
        </p>
      </div>
    )
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
        <p className="detail">{`${state.fileName || 'File'} created`}</p>
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

export default Message
