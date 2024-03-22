import { useState, useEffect } from 'react'
import Login from './components/Login'
import blogService from './services/blogs'
import BlogReel from './components/BlogReel'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Log In">
          <Login setUser={setUser} />
        </Togglable>
      </div>
    )
  }
  const blogForm = () => (
    <BlogReel user={user} />
  )

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App