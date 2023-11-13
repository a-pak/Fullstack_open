const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

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
  console.log(blogToBeRemoved.id)
  await api
    .delete(`/api/blogs/${blogToBeRemoved.id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).not.toContain(blogToBeRemoved) 
})

afterAll(async () => {
  await mongoose.connection.close()
})

