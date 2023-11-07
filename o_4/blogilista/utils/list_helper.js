const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => {
    likes += blog.likes
  })
  return likes
}

const favouriteBlog = (blogs) => {
  let favouriteBlog = {
    likes: 0
  }
  blogs.map(blog => {
    if(blog.likes > favouriteBlog.likes) {
      favouriteBlog = blog
    }
  })
  return favouriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}