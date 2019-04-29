import React from 'react'
import PropTypes from 'prop-types'
import { like, comment } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Segment, Form, Button, TextArea, Table } from 'semantic-ui-react'

const Blog = (props) => {
  const { blog } = props

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

  const handleComment = (e) => {
    e.preventDefault()
    const text = e.target.comment.value
    props.comment(text, blog.id)
    e.target.comment.value = ''
  }

  return (
    <>
      <Segment>
        <h2>{title}</h2>
        <p>Added by {author}</p>
        <p><a href={url}>{url}</a></p>
        <Button
          content='Like'
          icon='heart'
          label={{ as: 'a', basic: true, content: likes }}
          labelPosition='right'
          onClick={handleVote}
        />
        <br />
      </Segment>

      <h3>Comments</h3>
      <Table striped>
        <Table.Body>
          {comments.map(comment =>
            <Table.Row key={comment.id}>
              <Table.Cell>{comment.text}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <h3>Add a comment</h3>
      <Form onSubmit={handleComment}>
        <Form.Field>
          <TextArea name="comment" placeholder='Write a comment...' />
        </Form.Field>
        <Button type='submit'>Add comment</Button>
      </Form>
    </>
  )
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

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