import React from 'react'

const User = ({ user }) => {
    console.log(user)

    if ( user === undefined) { 
        return null
      }
    console.log(user.blogs)
    return (
            <div>
                <h2>{user.name}</h2>
                <h3>Added blogs</h3>
                <ul>
                    {user.blogs.map(blog => {
                        return (
                            <li key={blog.id}>
                                {blog.title}
                            </li>
                        )
                    })}
                </ul>
            </div>
    )
}

export default User