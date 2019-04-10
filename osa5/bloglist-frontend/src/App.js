import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState({ message: null, style: "error" })
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [createFormVisible, setCreateFormVisible] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('käyttäjätunnus tai salasana väärin')
    }
  }

  const updateBlogList = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  // two styles: 'error' and 'success'
  const showMessage = (message, style = "error") => {
    setErrorMessage({ message, style })
    setTimeout(() => {
      setErrorMessage({ ...errorMessage, message: null })
    }, 5000)
  }

  useEffect(() => {
    updateBlogList()
  }, [])

  useEffect(() => {
    const userString = window.localStorage.getItem(
      'loggedBlogUser'
    )
    if (userString) {
      const u = JSON.parse(userString)
      setUser(u)
      blogService.setToken(u.token)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem(
      'loggedBlogUser'
    )
    setUser(null)
  }

  const loginForm = (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </>
  )

  const blogsElement = (
    <>
      <h2>blogs</h2>
      <p>{user ? `${user.username} logged in` : ""}</p>
      <button onClick={logOut}>logout</button>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog blogs={blogs}
          setBlogs={setBlogs}
          key={blog.id}
          blog={blog}
          updateBlogList={updateBlogList}
          showMessage={showMessage} 
          user={user}
        />
      )}
      {createFormVisible &&
        <AddBlog
          newBlogAuthor={newBlogAuthor}
          newBlogTitle={newBlogTitle}
          newBlogUrl={newBlogUrl}
          setNewBlogAuthor={setNewBlogAuthor}
          setNewBlogTitle={setNewBlogTitle}
          setNewBlogUrl={setNewBlogUrl}
          showMessage={showMessage}
          updateBlogList={updateBlogList}
        />
      }
      <br />
      <button onClick={() => setCreateFormVisible(!createFormVisible)}>{createFormVisible ? 'hide' : 'show'}</button>
    </>
  )

  return (
    <div>
      <Notification message={errorMessage.message} styles={errorMessage.style} />
      {user === null ?
        loginForm :
        blogsElement
      }
    </div>
  )
}

export default App