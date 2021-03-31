import React, { useState } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const Login = ({ setUser }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
  )
}

export default Login
