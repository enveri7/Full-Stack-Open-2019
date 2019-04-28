import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import {like} from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = (props) => {
  const {blog} = props
  
  if (blog === undefined) {
    return null
  }

  const { title, author, url, likes } = blog

  const handleVote = () => {
    const newObject = { ...blog }
    newObject.likes += 1
    newObject.user = blog.user.id
    props.like(newObject, newObject.id)
  }

  const handleRemove = async () => {
    if (window.confirm(`Haluatko varmasti poistaa kohteen: ${blog.title}, ${blog.author}`)) {
      await blogService.remove(blog.id)
      // showMessage(`kohde ${blog.title}, ${blog.author} poistettu.`)
      // getBlogList()
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <a href={url}>{url}</a><br />
      {likes} likes <button onClick={handleVote}>like</button><br />
      Added by {author}
    </div>
  )
}

// Blog.propTypes = {
//   user: PropTypes.object,
//   showMessage: PropTypes.func.isRequired,
//   getBlogList: PropTypes.func.isRequired,
//   updateBlog: PropTypes.func.isRequired,
//   blog: PropTypes.object.isRequired,
// }

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  like
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)

