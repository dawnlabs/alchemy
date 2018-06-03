import React from 'react'

const Card = ({ title, detail }) => (
  <div>
    <h1>{title}</h1>
    <p className="detail">{detail}</p>
  </div>
)

const Message = ({ hover, state }) => {
  switch (state.status) {
    case 'IDLE': return (
      <Card
        title={hover ? 'Drop' : 'Drag & drop'}
        detail={`your files here to ${state.shifted ? 'convert' : 'add them'}`}
      />
    )
    case 'CONVERTING': return (
      <Card title="Converting" detail="(this should only take a sec)" />
    )
    case 'DONE': return (
      <Card title="Complete!" detail={`${state.fileName || 'File'} created`} />
    )
    case 'FAILED': return (
      <Card title="Conversion failed" detail="Uh oh, something went wrong 😕" />
    )
    default: return null
  }
}

export default Message
