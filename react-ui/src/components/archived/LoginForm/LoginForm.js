import React, { useState } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import noteService from '../../../services/notes'

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
      setUser(user)
      history.push('/')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default LoginForm
