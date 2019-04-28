import React from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loggedUserReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

import {withRouter} from 'react-router-dom'

const LoginForm = (props) => {

    const handleLogin = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        console.log(username, password)
        try {
            const user = await loginService.login({ username, password })
            props.setUser(user)

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            props.history.push('/')
            // setUser(user)
            // setUsername('')
            // setPassword('')
        } catch (exception) {
            showNotification('käyttäjätunnus tai salasana väärin')
        }
    }

    return (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    käyttäjätunnus
                <input type="text" name="username" />
                </div>
                <div>
                    salasana
                <input type="password" name="password" />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    showNotification,
    setUser
}

const LoginFormWithHistory = withRouter(LoginForm)

export default connect(null, mapDispatchToProps)(LoginFormWithHistory)