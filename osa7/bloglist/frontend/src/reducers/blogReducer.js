import blogService from '../services/blogs'
import commentService from '../services/comments'
import { dispatchNotification } from './notificationReducer'

// Action creators

export const createBlog = (blogObject) => {

  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatchNotification(dispatch, `Uusi blogi '${newBlog.title}' luotu.`)
    } catch (e) {
      dispatchNotification(dispatch, e.response.data.error)
    }
  }
}

export const like = (blogObject, id) => {
  return async dispatch => {
    const newBlog = await blogService.update(blogObject, id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    })
  }
}

export const comment = (text, blogId) => {
  return async dispatch => {
    const newComment = await commentService.create(text, blogId)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    })
  }
}

// reducer

const reducer = (state = [], action) => {
  const stateCopy = [...state]

  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      const updatedBlog = action.data
      return stateCopy.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    case 'NEW_COMMENT':
      const blogId = action.data.blog
      const blogToUpdate = stateCopy.find(blog => blog.id === blogId)
      blogToUpdate.comments.push({ text: action.data.text, id: action.data.id })
      return stateCopy.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog)
    default: return state
  }
}

export default reducer