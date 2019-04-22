import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newAnecdote) => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const update = async (newAnecdote) => {
    const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
    console.log(response)
    return response.data
}

export default { getAll, create, update }