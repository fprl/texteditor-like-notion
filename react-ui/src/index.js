import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
import Fonts from './components/styled/Fonts'
import GlobalStyles from './components/styled/GlobalStyles'
import Reset from './components/styled/Reset'

ReactDOM.render(
  <>
    <Reset />
    <GlobalStyles />
    <Router>
      <App />
    </Router>
  </>,
  document.getElementById('root')
)
