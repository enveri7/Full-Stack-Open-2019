import blogService from '../services/blogs'

// Action creators

// export const createAnecdote = (content) => {
//   return async dispatch => {
//     const newAnecdote = await anecdotesService.create({ content, votes: 0 })
//     dispatch({
//       type: 'NEW_ANECDOTE',
//       data: newAnecdote
//     })
//   }
// }

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: blogs
        })
    }
}

// reducer

const reducer = (state = [], action) => {
    console.log(state, action)
    switch (action.type) {
        case 'INITIALIZE':
            return action.data
        default: return state
    }
}

export default reducer