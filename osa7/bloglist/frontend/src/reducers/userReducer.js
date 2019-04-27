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

// reducer

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE_USERS':
            return action.data
        default: return state
    }
}

export default reducer