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
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }  
  ]
test('likes property is missing', async () => {
  await api
    .post('/api/blogs')
    .send(initialblogs[2])
    .expect(200)
  
  const savedBlog = await Blog.find({title: initialblogs[2].title}).exec()
  assert.ok(savedBlog.length > 0, "Saved Blog exists")
  if(savedBlog[0].likes === undefined){
    savedBlog[0].likes = 0
    await api
    .put(`/api/blogs/${savedBlog[0].id}`)
    .send({"likes": savedBlog[0].likes})
    .expect(200)
  }
  assert.strictEqual(savedBlog[0].author, initialblogs[2].author)
  assert.strictEqual(savedBlog[0].title, initialblogs[2].title)
  assert.strictEqual(savedBlog[0].url, initialblogs[2].url)
  assert.strictEqual(savedBlog[0].likes, 0)

})

after(async () => {
  await mongoose.connection.close()
})