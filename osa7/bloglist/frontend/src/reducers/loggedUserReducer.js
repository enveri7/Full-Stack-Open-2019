// action creators

export const setUser = (user) => {
    return dispatch => {
        dispatch({
            type: 'SET_USER',
            data: user
        })
    }
}

// reducer

const initialState = null

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_USER':
            return action.data
        case 'REMOVE_USER':
            return initialState
        default: return state
    }
}

export default reducer