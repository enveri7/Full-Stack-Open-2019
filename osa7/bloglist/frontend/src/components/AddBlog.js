import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'
import _ from 'lodash'

const AddBlog = ({ addBlog, showMessage }) => {

    const newBlogTitle = useField('title')
    const newBlogAuthor = useField('author')
    const newBlogUrl = useField('url')

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const newBlogObject = {
                title: newBlogTitle.value,
                author: newBlogAuthor.value,
                url: newBlogUrl.value
            }
            const newBlog = await blogService.create(
                newBlogObject
            )
            addBlog(newBlog)
            newBlogTitle.reset()
            newBlogAuthor.reset()
            newBlogUrl.reset()
            showMessage(`uusi blogi ${newBlogTitle.value} luotu`, 'success')
        } catch (exception) {
            showMessage('blogia ei voitu luoda')
        }
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleCreate}>
                <div>
                    title
            <input
                        // with omit we remove reset function from object
                        { ..._.omit(newBlogTitle, ['reset']) }
                        name="title"
                    />
                </div>
                <div>
                    author
            <input
                        { ..._.omit(newBlogAuthor, ['reset']) }
                        name="author"
                    />
                </div>
                <div>
                    url
            <input
                        { ..._.omit(newBlogUrl, ['reset']) }
                        name="url"
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AddBlog