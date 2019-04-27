import React from 'react'
import {connect} from 'react-redux'
import Blog from './Blog'

const BlogList = ({blogs}) => {
    return (
        <>
            <h2>blogs</h2>
            {/* <p>{user ? `${user.username} logged in` : ""}</p> */}
            {/* <button onClick={logOut}>logout</button> */}
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog
                    key={blog.id}
                    // updateBlog={updateBlog}
                    blog={blog}
                    // getBlogList={getBlogList}
                    // showMessage={showMessage}
                    // user={user}
                />
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(mapStateToProps, null)(BlogList)