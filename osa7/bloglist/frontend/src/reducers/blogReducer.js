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
            console.log("here")
            console.log([...state, action.data])
            return [...state, action.data]
        default: return state
    }
}

export default reducer