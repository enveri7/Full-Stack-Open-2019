import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, blog }) => {
  const { title, author, url, likes, user } = blog
  const [fullDetails, setFullDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDivClick = () => {
    setFullDetails(!fullDetails)
  }

  const handleLikeClick = async () => {
    const newData = { ...blog }
    newData.likes += 1
    newData.user = user.id
    const id = newData.id
    delete newData.id
    const data = await blogService.update(newData, id)
    console.log(data)
    // map blogs and change one which got liked
    const newBlogs = [...blogs].map(blog => blog.id === data.id ? data : blog)
    console.log(newBlogs, data)
    setBlogs(newBlogs)
  }
  console.log(blog)
  const showDetails = () => {
    if (fullDetails) {
      return (
        <div>
          <div onClick={handleDivClick}>
            <p>{title}, {author} </p>
          </div>
          <p><a href={url}>{url}</a></p>
          <p>{likes} likes <button onClick={handleLikeClick}>like</button></p>
          <p>Added by {user.name}</p>
        </div>
      )
    }
    return (
      <div onClick={handleDivClick}>
        <p>{title}, {author} </p>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {showDetails()}
      </div>
    </div>
  )
}

export default Blog

