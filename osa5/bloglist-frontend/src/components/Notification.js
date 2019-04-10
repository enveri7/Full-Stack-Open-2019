import React from 'react'

const Notification = ({ message , styles="error"}) => {
    if (!message) {
        return null
    }

    return (
        <div className={styles}>
            {message}
        </div>
    )
}

export default Notification