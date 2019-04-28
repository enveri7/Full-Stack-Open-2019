import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

    const liStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    return (
        <>
            <h2>blogs</h2>
            {/* <p>{user ? `${user.username} logged in` : ""}</p> */}
            {/* <button onClick={logOut}>logout</button> */}
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <div key={blog.id} style={liStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>


            )}
        </>
    )
}

// <Blog
//     key={blog.id}
//     // updateBlog={updateBlog}
//     blog={blog}
// // getBlogList={getBlogList}
// // showMessage={showMessage}
// // user={user}
// />

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(mapStateToProps, null)(BlogList)