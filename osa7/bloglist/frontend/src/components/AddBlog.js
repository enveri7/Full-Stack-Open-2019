import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Form, Input, Button, Popup, Icon } from 'semantic-ui-react'

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
        <>
            <h3>
                Create a new blog &nbsp;
                {!props.user && <Popup
                    trigger={<Icon name='info circle' />}
                    content="You must be logged in to create blogs."
                    basic
                />}
            </h3>
            <Form onSubmit={handleCreate}>
                <Form.Field>
                    <label>Title</label>
                    <Input disabled={props.user ? false : true} type="text" name="title" />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <Input disabled={props.user ? false : true} type="text" name="author" />
                </Form.Field>
                <Form.Field>
                    <label>URL</label>
                    <Input disabled={props.user ? false : true} type="text" name="url" />
                </Form.Field>
                <Button disabled={props.user ? false : true} type='submit'>Create</Button>
            </Form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.loggedUser
    }
}

const mapDispatchToProps = {
    createBlog,
    showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog)