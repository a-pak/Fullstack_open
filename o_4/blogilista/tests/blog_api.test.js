const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
require('express-async-errors')

const api = supertest(app)
let token
beforeAll(async () => {
  const login = {username: 'root', password: 'sekret'} 
  const response = await api
                    .post('/api/login')
                    .send(login)
  token =  response.body.token
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('response returns two blogs', async() => {
  const response = await api
  .get('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  expect(response.body).toHaveLength(2)
})

test('the responses first title equals "some title1"', async() => {
  const response = await api
  .get('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  expect(response.body[0].title).toBe('some title1')
})

test('response returns blog identifier "id" ', async() => {
  const response = await api
  .get('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  expect(response.body[0].id).toBeDefined()
})


test('"Posting unauthorized blog to db does not work', async() => {
  const newBlog = {
    "title": "Test_Blog",
    "author": "test",
    "url": "some.url"
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer asdfasd`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

let blogToBeRemoved = undefined

test('"Posting authorized blog to db works', async() => {
  const newBlog = {
    "title": "Test_Blog",
    "author": "test",
    "url": "some.url"
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get("/api/blogs")
    .set('Authorization', `bearer ${token}`)
  const titles = response.body.map(r => r.title)
  blogToBeRemoved = response.body[titles.length - 1]
  expect(titles).toContain("Test_Blog")
})

test('Delete "Test_Blog" from db', async() => {
  await api
    .delete(`/api/blogs/${blogToBeRemoved.id}`)
    .set('Authorization', `bearer ${token}`)
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
    .set('Authorization', `bearer ${token}`)
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
  
  const response = await api
    .put(`/api/blogs/${editedBlog.id}`)
    .set('Authorization', `bearer ${token}`)
    .send(editedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(response.body).toEqual(editedBlog)
})

afterAll(async () => {
  await mongoose.connection.close()
})

