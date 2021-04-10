import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import Sidebar from './Sidebar'
import Footer from './Footer'

import EditablePage from './EditablePage'
import NotFound from './NotFound'


const App = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar>
          <Link to={'/'}>notion.clone</Link>
          <Footer />
        </Sidebar>

        <Switch>
          <Route path="/" exact component={EditablePage} />
          <Route path="*" component={NotFound} />
          <Route path="/404" component={NotFound} />
        </Switch>
      </AppContainer>
    </Router>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`
