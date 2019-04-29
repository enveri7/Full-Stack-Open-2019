import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
    return (
        <>
            <h2>Users</h2>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Blogs created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.users.map(user => {
                        return (
                            <Table.Row key={user.id}>
                                <Table.Cell><Link to={`/users/${user.id}`}>{user.username}</Link></Table.Cell>
                                <Table.Cell>{user.blogs.length}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>
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