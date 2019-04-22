import anecdotesService from '../services/anecdotes'
// Action creators

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create({ content, votes: 0 })
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const increaseVotes = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1
    const updatedAnecdote = await anecdotesService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = (data) => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

const initialState = []

// reducer

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      const id = updatedAnecdote.id
      return state.map(a => a.id === id ? updatedAnecdote : a)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE':
      return action.data
    default: return state
  }
}

export default reducer