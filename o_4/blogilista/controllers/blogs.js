const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs)
})


blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    if (blog.title===undefined || blog.url===undefined) {
      response.status(400).json({ error: 'Bad Request - Missing blog name or URL' })
    } else {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    }
  } catch(err) {
    console.error(err)
    console.error('Error stack:', err.stack)
    console.error('Error message:', err.message)
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const existingBlog = await Blog.findById(blogId)
  console.log('existing blog::',existingBlog)
  if(!existingBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  } 
  else {
    existingBlog.title = request.body.title || existingBlog.title
    existingBlog.author = request.body.author || existingBlog.author
    existingBlog.url = request.body.url || existingBlog.url
    existingBlog.likes = request.body.likes || existingBlog.likes

    const updatedBlog = await existingBlog.save()

    response.status(200).json(updatedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (user.blogs.some(blog => blog._id.toString() === request.params.id)) {
    const removedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = blogRouter