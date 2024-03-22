import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './ScreenNotification'

const Login = ({ user, setUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notifMsg, setNotifMsg] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    console.log('loggin in...')

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifMsg('Wrong Credentials')
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={notifMsg} />

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>

    </div>
  )
}

export default Login