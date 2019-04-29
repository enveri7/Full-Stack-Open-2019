import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const BlogList = ({ blogs }) => {

    return (
        <>
            <h2>Blogs</h2>
            <Table striped>
                <Table.Body>
                    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                        <Table.Row key={blog.id}>
                            <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(mapStateToProps, null)(BlogList)