import React from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loggedUserReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

import { withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const LoginForm = (props) => {

    const handleLogin = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value

        try {
            const user = await loginService.login({ username, password })
            props.setUser(user)

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            props.history.push('/')
        } catch (exception) {
            props.showNotification('käyttäjätunnus tai salasana väärin')
        }
    }

    return (
        <div className='login-form'>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}
            </style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                </Header>
                    <Form onSubmit={handleLogin} size='large'>
                        <Segment stacked>
                            <Form.Input name="username" fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                fluid
                                name="password"
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button type="submit" color='teal' fluid size='large'>
                                Login
                    </Button>
                        </Segment>
                    </Form>
                    {/* <Message>
                        New to us? <a href='#'>Sign Up</a>
                    </Message> */}
                </Grid.Column>
            </Grid>
        </div>
    )
}

const mapDispatchToProps = {
    showNotification,
    setUser
}

const LoginFormWithHistory = withRouter(LoginForm)

export default connect(null, mapDispatchToProps)(LoginFormWithHistory)