import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Form, Input, Button } from 'semantic-ui-react'

const AddBlog = (props) => {

    const handleCreate = async (e) => {
        e.preventDefault()
        const newBlogObject = {
            title: e.target.title.value,
            author: e.target.author.value,
            url: e.target.url.value
        }

        props.createBlog(
            newBlogObject
        )

        e.target.title.value = ''
        e.target.author.value = ''
        e.target.url.value = ''
    }

    return (
        <div>
            <h3>Create new</h3>
            <Form onSubmit={handleCreate}>
                <Form.Field>
                    <label>Title</label>
                    <Input type="text" name="title" />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <Input type="text" name="author" />
                </Form.Field>
                <Form.Field>
                    <label>URL</label>
                    <Input type="text" name="url" />
                </Form.Field>
                <Button type='submit'>Create</Button>

            </Form>
        </div>
    )
}

const mapDispatchToProps = {
    createBlog,
    showNotification
}

export default connect(null, mapDispatchToProps)(AddBlog)