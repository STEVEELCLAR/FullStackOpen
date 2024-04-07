const { test, after } = require('node:test')
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
    },
    {
      title: "Wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 5,
    }  
  ]
test('blogs are saved correctly', async () => {
  const repsonse = await api
    .post('/api/blogs')
    .send(initialblogs[2])
    .expect(200)
  
  const blogCount = await Blog.find({}).exec()
  assert.strictEqual(blogCount.length>2, true)

  const savedBlog = await Blog.find({title: initialblogs[2].title}).exec()
  assert.ok(savedBlog.length > 0, "Saved Blog exists")
  assert.strictEqual(savedBlog[0].author, initialblogs[2].author)
  assert.strictEqual(savedBlog[0].title, initialblogs[2].title)
  assert.strictEqual(savedBlog[0].url, initialblogs[2].url)
  assert.strictEqual(savedBlog[0].likes, initialblogs[2].likes)

})


after(async () => {
  await mongoose.connection.close()
})