// action creators

const showNotification = (id, content) => {
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

let nextNotificationId = 0
export function showNotificationWithTimeout(dispatch, text) {
    // The notifications have IDs to avoid
    // race condition if you show two notifications fast enough. 
    // When the first timeout finishes, it will dispatch REMOVE, 
    // erroneously hiding the second notification sooner than after the timeout.

    const id = nextNotificationId++
    dispatch(showNotification(id, text))

    setTimeout(() => {
        dispatch(removeNotification(id))
    }, 5000)
}

const initialState = []

// reducer

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SHOW':
            const newState = [...state, action.data]
            console.log(newState)
            return newState
        case 'REMOVE':
            const stateCopy = [...state]
            console.log(stateCopy)
            return stateCopy.filter(item => item.id !== action.data.id)
        default: return state
    }
}

export default reducer