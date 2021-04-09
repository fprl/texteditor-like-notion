import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import Fonts from './components/styled/Fonts'
import GlobalStyles from './components/styled/GlobalStyles'
import Reset from './components/styled/Reset'

ReactDOM.render(
  <>
    <Reset />
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root')
)
