const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
require('express-async-errors')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('response returns two blogs', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('the responses first title equals "some title1"', async() => {
  const response = await api.get('/api/blogs')
  console.log("RESPONSE:", response.body)
  expect(response.body[0].title).toBe('some title1')
})

test('response returns blog identifier "id" ', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

let blogToBeRemoved = undefined
test('POST /api/blogs posts a blog to the db', async() => {
  const newBlog = {
    "title": "Test_Blog",
    "author": "test",
    "url": "some.url"
  }
  console.log(newBlog)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get("/api/blogs")

  const titles = response.body.map(r => r.title)
  blogToBeRemoved = response.body[titles.length - 1]
  expect(titles).toContain("Test_Blog")
})

test('Delete "Test_Blog" from db', async() => {
  await api
    .delete(`/api/blogs/${blogToBeRemoved.id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).not.toContain(blogToBeRemoved) 
})

test('Wrong post request returns "400 Bad Request"', async() => {
  const blog = {
    "title": "Wrong blog",
    "author": "admin"
  }
  await api
    .post('/api/blogs/')
    .send(blog)
    .expect(400)
})

test('Editing a premade blog edits the blog and returns 200', async() => {
  const editedBlog = {
    "id": "65490b02f39fa5c7781f6308",
    "title": "some title3",
    "author": "me2",
    "url": "some.url",
    "likes": 2
  }
  console.log(editedBlog.id)
  
  const response = await api
    .put(`/api/blogs/${editedBlog.id}`)
    .send(editedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(response.body).toEqual(editedBlog)
})

afterAll(async () => {
  await mongoose.connection.close()
})

