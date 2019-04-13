import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ updateBlog, user, showMessage, getBlogList, blog }) => {
  const [fullDetails, setFullDetails] = useState(false)
  const { title, author, url, likes } = blog

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

  const handleLikeClick = () => {
    const newObject = { ...blog }
    newObject.likes += 1
    newObject.user = blog.user.id
    updateBlog(newObject, newObject.id)
  }

  const handleRemove = async () => {
    if (window.confirm(`Haluatko varmasti poistaa kohteen: ${blog.title}, ${blog.author}`)) {
      await blogService.remove(blog.id)
      showMessage(`kohde ${blog.title}, ${blog.author} poistettu.`)
      getBlogList()
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

Blog.propTypes = {
  user: PropTypes.object,
  showMessage: PropTypes.func.isRequired,
  getBlogList: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog

