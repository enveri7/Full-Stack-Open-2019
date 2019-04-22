// action creators

export const showNotification = (content, id) => {
    return {
        type: 'SHOW',
        data: { content, id }
    }
}

export const removeNotification = (id) => {
    return {
        type: 'REMOVE',
        data: { content: null, id }
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