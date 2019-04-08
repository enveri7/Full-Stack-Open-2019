const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "Edsgerin Blogi",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.edsger.com",
        "likes": 3,
        "id": "5caaf8432128891183fdc6aa"
    },
    {
        "title": "Teemun Blogi",
        "author": "Teemu Roivas",
        "url": "http://www.teemu.com",
        "likes": 5,
        "id": "5caaf8552128891183fdc6ab"
    },
    {
        "title": "Edsgerillä on asiaa",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.edsger.com",
        "likes": 0,
        "id": "5caaf87a2128891183fdc6ac"
    },
    {
        "title": "Edsgern periaatteet",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.edsger.com",
        "likes": 4,
        "id": "5caaf88b2128891183fdc6ad"
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}