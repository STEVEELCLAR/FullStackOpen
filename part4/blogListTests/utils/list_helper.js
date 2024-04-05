const _ = require('lodash');

const mostBlogs = (blogs) => {

  const authorCounts = _.countBy(blogs, 'author');

  const topAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  };
};

const mostLikes = (blogs) => {

    const authorLikes = _.groupBy(blogs, 'author');
    const authorOverallLikes = _.mapValues(authorLikes, blogs => _.sumBy(blogs, 'likes'));
    const topAuthor = _.maxBy(_.keys(authorOverallLikes), author => authorOverallLikes[author]);
  
  
    return {
      author: topAuthor,
      blogs: authorOverallLikes[topAuthor]
    };
  };


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
    favoriteBlog,
    mostBlogs,
    mostLikes
  }