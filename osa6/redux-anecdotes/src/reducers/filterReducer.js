// action creators

export const filterAnecdotes = (content) => {
    return {
        type: 'SET_FILTER',
        data: content
    }
}

const initialState = ""

// reducer

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data
        default: return state
    }
}

export default reducer