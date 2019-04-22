// Action creators

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const increaseVotes = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INITIALIZE',
    data
  }
}

const initialState = []

// reducer

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(a => a.id === id ? changedAnecdote : a)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE':
      return action.data
    default: return state
  }
}

export default reducer