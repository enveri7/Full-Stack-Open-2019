import blogService from '../services/blogs'

// Action creators

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
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
    console.log(state, action)
    switch (action.type) {
        case 'INITIALIZE_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'UPDATE_BLOG':
            const updatedBlog = action.data
            const stateCopy = [...state]
            return stateCopy.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        default: return state
    }
}

export default reducer