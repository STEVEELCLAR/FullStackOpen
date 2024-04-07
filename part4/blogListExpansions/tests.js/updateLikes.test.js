const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const initialblogs = [
    {
      _id: "651103c4a1681f9d6064a23c",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 5,
    }  
  ]
test('update like', async () => {
  await api
    .post('/api/blogs')
    .send(initialblogs[0])
    .expect(200)
  
  const savedBlog = await Blog.find({title: initialblogs[0].title}).exec()
  assert.ok(savedBlog.length > 0, "Saved Blog exists")
  if(savedBlog[0].likes){
    savedBlog[0].likes = 4
    await api
    .put(`/api/blogs/${savedBlog[0].id}`)
    .send({"likes": savedBlog[0].likes})
    .expect(200)
  }
  assert.strictEqual(savedBlog[0].author, initialblogs[0].author)
  assert.strictEqual(savedBlog[0].title, initialblogs[0].title)
  assert.strictEqual(savedBlog[0].url, initialblogs[0].url)
  assert.strictEqual(savedBlog[0].likes, 4)

})


after(async () => {
  await mongoose.connection.close()
})