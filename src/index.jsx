import React from 'react'
import { render } from 'react-dom'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Sanitizer from './components/Sanitizer'

const App = DragDropContext(HTML5Backend)(Sanitizer)

render(
  <App />,
  document.getElementById('root')
)
