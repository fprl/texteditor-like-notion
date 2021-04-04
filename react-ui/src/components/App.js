import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import noteService from '../services/notes'

import EditablePage from './EditablePage'
import NotFound from './NotFound'

import Navbar from './Navbar'
import Footer from './Footer'

const App = () => {
  return (
    <Router>
      <Navbar>
        <Link to={'/'}>notion.clone</Link>
      </Navbar>

      <Switch>
        <Route path="/" exact component={EditablePage} />
        <Route path="*" component={NotFound} />
        <Route path="/404" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  )
}

export default App
