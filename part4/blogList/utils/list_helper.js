const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((previous, current)=>(previous.likes > current.likes ? previous : current ))
    return {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
          
    }
}

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }