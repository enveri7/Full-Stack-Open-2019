import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (newComment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {text: newComment})
  return response.data
}

export default {create}