import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './ScreenNotification'

const CreateBlog = ({ setNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notifMsg, setNotifMsg] = useState('')

  const handleCreate = async event => {
    event.preventDefault()
    console.log('creating a blog...')

    try {
      const response = await blogService.create({
        title, author, url
      })
      console.log(response)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNewBlog(response)
      setNotifMsg(`Blog ${title} by ${author} added to blogs`)
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)
    } catch {
      //setErrorMessage('Error creating a blog post')
      setNotifMsg('Error creating a blog post')
      setTimeout(() => {
        //setErrorMessage(null)
        setNotifMsg(null)
      }, 5000)
    }

  }

  return (
    <div>
      <Notification message={notifMsg} />
      <h2>Create a blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onSubmit={handleCreate}>create</button>
      </form>

    </div>
  )
}

export default CreateBlog