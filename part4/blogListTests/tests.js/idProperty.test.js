const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const initialblogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,

    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,

    } 
  ]
test('id propoerty', () => {
    let blogObject = new Blog(initialblogs[0])
    const result =  blogObject.toJSON();
    assert.ok(result !== undefined)
    assert.ok(result._id === undefined)
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