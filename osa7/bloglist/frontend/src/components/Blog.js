import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { like, comment } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = (props) => {
  const { blog } = props
  console.log(props)
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

  const handleComment = (e) => {
    e.preventDefault()
    const text = e.target.comment.value
    console.log(text)
    props.comment(text, blog.id)
  }

  console.log(comments)
  return (
    <div>
      <h2>{title}</h2>
      <a href={url}>{url}</a><br />
      {likes} likes <button onClick={handleVote}>like</button><br />
      Added by {author}<br />
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <div><input placeholder="new comment" name="comment" type="text" /> <button type="submit">Add comment</button></div>
      </form>
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
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  like,
  comment
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)

