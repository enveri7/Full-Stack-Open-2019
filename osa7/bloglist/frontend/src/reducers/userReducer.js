import userService from '../services/users'

// Action creators

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INITIALIZE_USERS',
            data: users
        })
    }
}

export const addBlogToUser = (username, blog) => {
    return async (dispatch, getState) => {
        dispatch({
            type: 'ADD_BLOG_TO_USER',
            data: { username, blog }
        })
    }
}

// reducer

const reducer = (state = [], action) => {
    const stateCopy = [...state]
    switch (action.type) {
        case 'INITIALIZE_USERS':
            return action.data
        case 'ADD_BLOG_TO_USER':
            const { username, blog } = action.data
            const userToUpdate = stateCopy.find(user => user.username === username)
            userToUpdate.blogs.push(blog)
            return stateCopy.map(user => user.username === username ? userToUpdate : user)
        default: return state
    }
}

export default reducer