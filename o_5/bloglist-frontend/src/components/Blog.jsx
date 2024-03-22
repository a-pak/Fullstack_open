import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './ScreenNotification'

const Blog = ({ blog, setUpdate }) => {
  const [blogView, setBlogView] = useState(false)
  const [notifMsg, setNotifMsg] = useState()
  const toggleView = () => {
    setBlogView(!blogView)
  }
  const likeBlog = async event => {
    event.preventDefault()
    const updBlog = {
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try{
      const response = await blogService.update(blog.id, updBlog)
      setUpdate(updBlog)
      console.log('updated:', response)
    } catch {
      console.log('Error liking a blog post')
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)
    }
  }
  const removeBlog = async event => {
    event.preventDefault()
    try{
      const response = await blogService.remove(blog.id)
      setUpdate(blog.id)
      console.log('Blog deleted:', response)
    } catch {
      console.log('Error removing a blog post')
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div data-testid="blogTest" style={blogStyle}>
      {!blogView && <div>{blog.title} {blog.author} <button onClick={toggleView}>View</button></div>}
      {blogView &&
    <div>
      Blog Title: {blog.title} <button onClick={toggleView}>Hide</button>
      <br />
      Author: {blog.author}
      <br />
      {blog.url}
      <br />
      Likes: {blog.likes} <button onClick={likeBlog}>Like</button>
      <br />
      Added by: {blog.user.username}
      <br />
      <button onClick={removeBlog}>Remove</button>
    </div>}
    </div>
  )}

export default Blog