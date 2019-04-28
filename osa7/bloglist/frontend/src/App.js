import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'


import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser } from './reducers/loggedUserReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const userString = window.localStorage.getItem(
      'loggedBlogUser'
    )
    if (userString) {
      const u = JSON.parse(userString)
      props.setUser(u)
      blogService.setToken(u.token)
    }
  }, [])

  const userById = (id) => {
    console.log(props.users, id)
    return props.users.find(user => user.id === (id))
  }

  const blogById = (id) => {
    return props.blogs.find(blogs => blogs.id === (id))
  }

  return (
    <div>
      <Router>
        <Menu />
        <Notification />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/" render={() => <BlogList />} />
        <Route exact path="/" render={() => <AddBlog />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog blog={blogById(match.params.id)} />
        } />
      </Router>
    </div>
  )
}

// tän voi korvata ehkä routerilla
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)