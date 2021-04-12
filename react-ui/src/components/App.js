import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import Sidebar from './Sidebar'
import Footer from './Footer'

import EditablePage from './EditablePage'
import NotFound from './NotFound'

import servicesPages from '../services/pages'

const pagesObject = servicesPages

const App = () => {
  const [pages, setPages] = useState()

  useEffect(() => {
    setPages(pagesObject)
  }, [pages])

  return (
    <Router>
      <AppContainer>
        <Sidebar>
          {pages && (
            <>
              <Link to={'/'}>notion.clone</Link>
              {pages.map(page => (
                <Link key={page.information.id} to={`/${page.information.id}`}>
                  {page.information.title}
                </Link>
              ))}
            </>
          )}
        </Sidebar>

        {/* <Footer /> */}
        <Switch>
          <Route path='/' exact component={EditablePage} />
          <Route path='/:id'>
            <EditablePage pages={pages}/>
          </Route>
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
