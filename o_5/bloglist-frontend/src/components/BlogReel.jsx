import { useEffect, useState } from 'react'
import React from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import blogService from '../services/blogs'
import Togglable from './Togglable'


const BlogReel = ({ user }) => {

  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState()
  const [update, setUpdate] = useState()

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
    }
  }, [user, newBlog, update])


  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  return (
    <div>
      <h2 style={{ display: 'inline-block', marginRight: '50px' }} >blogs</h2>
      <p style={{ alignContent: 'right', display: 'inline-block', marginRight: '10px' }}>{user.name} logged in</p>
      <button style={{ display: 'inline-block' }} onClick={handleLogOut}>Log out</button>
      <Togglable id="add-blog" buttonLabel="Add a new blog">
        <CreateBlog setNewBlog={setNewBlog}/>
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setUpdate={setUpdate}/>
      )}
    </div>
  )
}

export default BlogReel