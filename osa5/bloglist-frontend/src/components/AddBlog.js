import React from 'react'
import blogService from '../services/blogs'

const AddBlog = ({ getBlogList, showMessage, newBlogAuthor, newBlogTitle, newBlogUrl, setNewBlogAuthor, setNewBlogTitle, setNewBlogUrl }) => {

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const newBlogObject = {
                title: newBlogTitle,
                author: newBlogAuthor,
                url: newBlogUrl
            }
            await blogService.create(
                newBlogObject
            )
            getBlogList()
            setNewBlogTitle('')
            setNewBlogAuthor('')
            setNewBlogUrl('')
            showMessage(`uusi blogi ${newBlogTitle} luotu`, 'success')
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
                        type="text"
                        value={newBlogTitle}
                        name="title"
                        onChange={({ target }) => setNewBlogTitle(target.value)}
                    />
                </div>
                <div>
                    author
            <input
                        type="text"
                        value={newBlogAuthor}
                        name="author"
                        onChange={({ target }) => setNewBlogAuthor(target.value)}
                    />
                </div>
                <div>
                    url
            <input
                        type="text"
                        value={newBlogUrl}
                        name="url"
                        onChange={({ target }) => setNewBlogUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AddBlog