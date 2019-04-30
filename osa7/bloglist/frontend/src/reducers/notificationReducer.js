// action creators

export const showNotification = (message, time=3) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: message
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
            })
        }, time * 1000)
    }
}

// reducer

const reducer = (state = "", action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return ''
        default: return state
    }
}

export default reducer