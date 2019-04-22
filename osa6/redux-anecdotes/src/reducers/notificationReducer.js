// action creators

const showNotification = (content, id) => {
    return {
        type: 'SHOW',
        data: { content, id }
    }
}

const removeNotification = (id) => {
    return {
        type: 'REMOVE',
        data: { content: null, id }
    }
}

export const setNotification = (content, id, time) => {
    return async dispatch => {
        dispatch(showNotification(content, id))
        setTimeout(() => {
            dispatch(removeNotification(id))
        }, time*1000)
    }
}

const initialState = []

// reducer

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SHOW':
            const newState = [...state, action.data]
            return newState
        case 'REMOVE':
            const stateCopy = [...state]
            return stateCopy.filter(item => item.id !== action.data.id)
        default: return state
    }
}

export default reducer