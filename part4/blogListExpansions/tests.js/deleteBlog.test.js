const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const initialblogs = [
    {
      _id: "661103csa1681f9f6064a23c",
      title: "Type",
      author: "Msrk  C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypWars.html",
      likes: 5,
    }  
  ]
test('delete blog', async () => {
  await api
    .post('/api/blogs')
    .send(initialblogs[0])
    .expect(200)
    
  const savedBlog = await Blog.find({title: initialblogs[0].title}).exec()
  assert.ok(savedBlog.length > 0, "Saved Blog exists")
  await api
    .delete(`/api/blogs/${savedBlog[0].id}`)
    .expect(204)

  const updatedBlog = await Blog.find({title: initialblogs[0].title}).exec()
  assert.strictEqual(updatedBlog[0], undefined)

})


after(async () => {
  await mongoose.connection.close()
})