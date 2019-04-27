import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import _ from 'lodash'

const AddBlog = (props) => {

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const newBlogObject = {
                title: e.target.title.value,
                author: e.target.author.value,
                url: e.target.url.value
            }
            console.log(newBlogObject)
            props.createBlog(
                newBlogObject
            )
            // addBlog(newBlog)
            // newBlogTitle.reset()
            // newBlogAuthor.reset()
            // newBlogUrl.reset()
            props.showNotification(`uusi blogi ${e.target.title.value} luotu.`)
        } catch (exception) {
            props.showNotification(`blogin luonnissa tapahtui virhe.`)

        }
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleCreate}>
                <div>Title: <input name="title" type="text" /></div>
                <div>Author: <input name="author" type="text" /></div>
                <div>URL: <input name="url" type="text" /></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    }
    }

    const mapDispatchToProps = {
        createBlog,
        showNotification
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog)