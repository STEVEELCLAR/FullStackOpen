const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const initialblogs = [
    {
      _id:"6610ef4bcc21c5b44f1869d1",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      _id: "6610f512ce377996096dff31",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    } 
  ]
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialblogs[0])
    await blogObject.save()
    blogObject = new Blog(initialblogs[1])
    await blogObject.save()
  })

after(async () => {
  await mongoose.connection.close()
})