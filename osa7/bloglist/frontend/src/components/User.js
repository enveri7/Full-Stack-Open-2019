import React from 'react'
import { Table } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const User = ({ user }) => {

    if (user === undefined) {
        return null
    }

    return (
        <>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <Table striped>
                <Table.Body>
                    {user.blogs.map(blog => {
                        return (
                            <Table.Row key={blog.id}>
                                <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>
    )
}

export default User