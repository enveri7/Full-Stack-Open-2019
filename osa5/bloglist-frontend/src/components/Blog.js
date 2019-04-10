import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ user, showMessage, updateBlogList, blogs, setBlogs, blog }) => {
  const { title, author, url, likes } = blog
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
    newData.user = blog.user.id
    const id = newData.id
    delete newData.id
    const data = await blogService.update(newData, id)
    // map blogs and change one which got liked
    const newBlogs = [...blogs].map(blog => blog.id === data.id ? data : blog)
    setBlogs(newBlogs)
  }

  const handleRemove = async () => {
    if (window.confirm(`Haluatko varmasti poistaa kohteen: ${blog.title}, ${blog.author}`)) {
      await blogService.remove(blog.id)
      showMessage(`kohde ${blog.title}, ${blog.author} poistettu.`)
      updateBlogList()
    }
  }

  const showDetails = () => {
    if (fullDetails) {
      return (
        <div>
          <div onClick={handleDivClick}>
            <p>{title}, {author} </p>
          </div>
          <p><a href={url}>{url}</a></p>
          <p>{likes} likes <button onClick={handleLikeClick}>like</button></p>
          <p>Added by {blog.user.name}</p>

          {(user.username === blog.user.username) && <button onClick={handleRemove}>remove</button>}
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

