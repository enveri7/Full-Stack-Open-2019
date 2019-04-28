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

  const { title, author, url, likes, comments } = blog

  const handleVote = () => {
    const newObject = { ...blog }
    newObject.likes += 1
    newObject.user = blog.user.id
    newObject.comments = blog.comments.map(comment => comment.id)
    props.like(newObject, newObject.id)
  }

  const handleRemove = async () => {
    if (window.confirm(`Haluatko varmasti poistaa kohteen: ${blog.title}, ${blog.author}`)) {
      await blogService.remove(blog.id)
      // showMessage(`kohde ${blog.title}, ${blog.author} poistettu.`)
      // getBlogList()
    }
  }

  console.log(comments)
  return (
    <div>
      <h2>{title}</h2>
      <a href={url}>{url}</a><br />
      {likes} likes <button onClick={handleVote}>like</button><br />
      Added by {author}<br />
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
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

