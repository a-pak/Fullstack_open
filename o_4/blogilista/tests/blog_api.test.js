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

afterAll(async () => {
  await mongoose.connection.close()
})

