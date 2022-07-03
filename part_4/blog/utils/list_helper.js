

const dummy = (blogs) => {
    return 1
}
const totalLikes = (listWithOneBlog) => {
    const total = listWithOneBlog.reduce ((sum , listWithOneBlog )=> sum + listWithOneBlog.likes, 0)
        return total
}

const average = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
  
    return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
  }
  
  module.exports = {
    dummy,
    totalLikes,
    average,
  }

  
