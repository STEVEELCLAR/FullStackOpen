import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import './index.css'

const Blogs = ({author, title, url, likes, vote}) => {
  return(
    <div> <b>Title:</b> {title} 
          <b>Author:</b> {author} 
          <b>URL:</b> {url} 
          <b>Likes:</b> {likes}
      <button onClick={vote}>vote</button>
    </div>
  )
}


const BlogsForm = ({addNote, newAuthor, eventAuthorHandler, newTitle, eventTitleHandler, newURL, eventURLHandler}) => {
  return (
    <form onSubmit={addNote} >
        <div>
          Author: <input value = {newAuthor} onChange={eventAuthorHandler}/>
        </div>
        <div>
          Title: <input value = {newTitle} onChange={eventTitleHandler}/>
        </div>
        <div>
          Url: <input value = {newURL} onChange={eventURLHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Notification = ({ message, design }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={design}>
      {message}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newURL, setNewURL] = useState('');
  const [notifMessage, setNotifMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    blogService
      .getAll()
      .then(response => {
        setBlogs(response.data)
    })
  }, [])
  console.log('render', blogs.length, 'blogs')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newURL,
      likes: 0
    }
    
    blogService
        .create(blogObject)
        .then(response => {
          setBlogs(blogs.concat(response.data))
          setNotifMessage(`Added ${newTitle}`)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotifMessage('')
          setErrorMessage(`Error${error.response.data.error}`)
        })
      setNewAuthor('')
      setNewTitle('')
      setNewURL('')
      setErrorMessage('')
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const voteCounter = id => {
    const blog = blogs.find((blog) => blog.id === id)

    const blogObject = {
      likes: blog.likes + 1
    }
    blogService
    .update(blog.id, blogObject).then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setNewAuthor('')
      setNewTitle('')
      setNewURL('')
      setNotifMessage(`Updated vote count for the ${blog.title} Title `)
      setErrorMessage('')
    })
    .catch(error => {
      setNotifMessage('')
      setErrorMessage(`Information of '${blog.title}' has already been removed from server`)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notifMessage && <Notification message={notifMessage} design = "notif"/>}
      {errorMessage && <Notification message = {errorMessage} design = "error" />}

      <h2>add a new blog</h2>
      <BlogsForm 
          addNote = {addBlog} newAuthor = {newAuthor} eventAuthorHandler = {handleAuthorChange}
          newTitle = {newTitle} eventTitleHandler = {handleTitleChange}
          newURL = {newURL} eventURLHandler = {handleURLChange}
      />     
      <h2>Numbers</h2>
      <div>
      {blogs.map((blog, index) => (
          <div key={index}>
            <Blogs
              author={blog.author} 
              title = {blog.title}
              url = {blog.url}
              likes = {blog.likes}
              vote = {()=> voteCounter(blog.id)}
            />
          </div>
        ))}
    </div>
    </div>
  )
}

export default App;