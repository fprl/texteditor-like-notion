import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import servicesPages from '../services/pages'

import Sidebar from './Sidebar'
import EditablePage from './EditablePage'
import Footer from './Footer'
import NotFound from './NotFound'


const pagesObject = servicesPages

const App = () => {
  const [pages, setPages] = useState(pagesObject)

  useEffect(() => {
    setPages(pagesObject)
  }, [pages])

  // home redirect to last visited (now first page)
  const linkToRedirect = `/${pages[0].information.id}`

  // pass only the required page to the component
  const match = useRouteMatch('/:id')
  const page = match
    ? pages.find(page => page.information.id === match.params.id)
    : null

  // pass only the information of the pages
  const sideBarLinks = pages.map(p => p.information)

  return (
    <AppContainer>
      <Sidebar links={sideBarLinks} />
      <Switch>
        <Route path="/:id">
          <EditablePage page={page} />
        </Route>

        <Route path="/" exact>
          <Redirect to={linkToRedirect} />
        </Route>
        <Route path="*" component={NotFound} />
        <Route path="/404" component={NotFound} />
      </Switch>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`
