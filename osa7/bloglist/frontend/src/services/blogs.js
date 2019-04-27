import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  // token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlbWUiLCJpZCI6IjVjYWIxZGVhZTQwOTY3MjY2ZTlkYjA5NCIsImlhdCI6MTU1NjM2OTA5Nn0.NcmTYK7ulHsOoTwJHRZyclwoX7jKdyFafdjJCfZzAdc"
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  const url = baseUrl + `/${id}`
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.put(url, newObject, config)
  return response.data
}

const remove = async (id) => {
  const url = baseUrl + `/${id}`
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.delete(url, config)
  return response.status
}

export default { getAll, create, setToken, update, remove }