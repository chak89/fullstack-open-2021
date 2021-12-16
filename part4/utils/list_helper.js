const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if(blogs.length === 0) {
    return 0
  }

  if(blogs.length === 1) {
    return blogs[0].likes
  }

  
  return blogs.reduce((previousValue, currentValue) => {
    const total = previousValue.likes + currentValue.likes
    //Returns a object with propery likes as the previousValue
    return {likes: total}
  }).likes
}

module.exports = {
  dummy,
  totalLikes
}