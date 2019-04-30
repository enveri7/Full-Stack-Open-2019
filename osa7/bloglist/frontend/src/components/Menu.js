import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/loggedUserReducer'
import blogService from '../services/blogs'

const NavMenu = (props) => {
    const { user } = props

    const handleLogout = () => {
        window.localStorage.removeItem(
            'loggedBlogUser'
        )
        props.setUser(null)
        blogService.setToken(null)
    }

    return (
        <div>
            <Menu>
                <Menu.Item as={Link} to="/">
                    Blogs
                </Menu.Item>
                <Menu.Item as={Link} to="/users">
                    Users
                </Menu.Item>
                <Menu.Menu position='right'>
                    {user
                        ? (
                            <>
                                <Menu.Item>
                                    <em>{user.username} logged in</em>
                                </Menu.Item>
                                <Menu.Item onClick={handleLogout}>
                                    <p>Logout</p>
                                </Menu.Item>
                            </>

                        )
                        : (
                            <Menu.Item as={Link} to="/login">
                                Login
                    </Menu.Item>
                        )
                    }
                </Menu.Menu>
            </Menu>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.loggedUser
    }
}

export default connect(mapStateToProps, { setUser })(NavMenu)
