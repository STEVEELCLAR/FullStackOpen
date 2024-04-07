const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe("POST /api/blogs", () => {

  test('adding a new blog with valid token', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://testblog.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRkZGRkIiwiaWQiOiI2NjEyNWZkYmE5ZTE1N2UwNDk3OTAyNzYiLCJpYXQiOjE3MTI1MDE4MDZ9.mY7oD4Dy-GDIICeDNLlidYkY4q4zaohymPS4bcBndS0`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('adding a new blog without token should fail with 401', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://blog.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  after(async () => {
    // Clean up
    await Blog.deleteMany({})
    await User.deleteMany({})
    await mongoose.connection.close()
  })
})
