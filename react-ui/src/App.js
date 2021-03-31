import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import noteService from './services/notes'

import Home from './Home'
import Login from './Login'
import Users from './Users'
import Notes from './Notes'
import Note from './Note'
import NotFound from './NotFound'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
    <Router>
      <Navbar >
        <Link to={'/'}>home</Link>
        <Link to={'/notes'}>notes</Link>
        <Link to={'/users'}>users</Link>
        {!user ? <Link to={'/login'}>login</Link> : null}
        {user ? <Link to={'/'} onClick={logOut}>logout</Link> : null}
      </Navbar>

      <Switch>
        <Route path='/' exact>
          <Home>
            {user ? <p>{user.name} logged in.</p> : null}
          </Home>
        </Route>
        <Route path='/notes/:id' component={Note} />
        <Route path='/notes' >
          <Notes user={user} />
        </Route>
        <Route path='/users' >
          <Users />
        </Route>
        <Route path='/login' >
          <Login setUser={setUser} />
        </Route>
        <Route path='*' component={NotFound} />
        <Route path='/404' component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  )
}

export default App
