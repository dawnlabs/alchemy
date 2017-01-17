import React from 'react'
import { render } from 'react-dom'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Tray from './components/Tray'

require('../styles/index.scss')

const App = DragDropContext(HTML5Backend)(Tray)

render(
  <App />,
  document.getElementById('root')
)
