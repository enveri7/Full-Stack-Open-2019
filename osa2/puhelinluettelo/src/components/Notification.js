import React from 'react'

const Notification = ({ message, classes = "success" }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={classes}>
            {message}
        </div>
    )
}

export default Notification