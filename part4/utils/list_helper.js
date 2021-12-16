const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if (blogs.length === 0) {
    return 0
  }

  if (blogs.length === 1) {
    return blogs[0].likes
  }


  return blogs.reduce((previousValue, currentValue) => {
    const total = previousValue.likes + currentValue.likes
    //Returns a object with propery likes as the previousValue
    return { likes: total }
  }).likes
}


const favoriteBlog = (blogs) => {
  //Sort using Sort Compare Function 
  //clone array so we don't change the original when using .sort()
  //b - a sort in descending order
  clonedBlogs = [...blogs]
  clonedBlogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return clonedBlogs[0]
}

const mostBlogs = (blogs) => {
  let authorsMap = new Map();

  //Map each author and occurnce to a Map
  blogs.forEach((blog) => {
    if (authorsMap.has(blog.author)) {
      authorsMap.set(blog.author, authorsMap.get(blog.author) + 1)
    } else {
      authorsMap.set(blog.author, 1)
    }
  })

  //Convert from Map to an array of object, then sort in descending order by most blogs.
  authorsArray = Array.from(authorsMap, ([author, blogs]) => ({ author, blogs }))
  .sort((a,b) => {
    return b.blogs - a.blogs
  })

  return authorsArray[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}