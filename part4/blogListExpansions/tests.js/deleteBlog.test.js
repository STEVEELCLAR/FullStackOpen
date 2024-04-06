const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')

const api = supertest(app)
  const initialblogs = 
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

  test('deletes a blog post by id', async () => {
    const response = await api
      .delete(`/api/blogs/6610ef4bcc21c5b44f1869d1`)
      assert.strictEqual(response.status, 204)

    // Check that the blog is deleted from the database
    const deletedBlog = await Blog.findById('6610ef4bcc21c5b44f1869d1')
    assert.strictEqual(deletedBlog, null)
  });

after(async () => {
  await mongoose.connection.close()
})