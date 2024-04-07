const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
describe("POST /api/blogs", () => {
  const initialblogs = [
    {
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "tatement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }  
  ]

  test('title is missing', async () => {
    const response = await api
      .post('/api/blogs')
      .send(initialblogs[0])
    assert.strictEqual(response.status, 400)
  })

  test('URL is missing', async () => {
    const response = await api
      .post('/api/blogs')
      .send(initialblogs[1])
    assert.strictEqual(response.status, 400)
  })
  
})
after(async () => {
  await mongoose.connection.close()
})