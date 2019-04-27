import React from 'react'
import { connect } from 'react-redux'
import User from './User'

const Users = (props) => {
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                <tr>
                    <th>name</th>
                    <th>blogs created</th>
                </tr>
                {props.users.map(user => <User key={user.username} user={user} />)}
                </tbody>
            </table>
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)