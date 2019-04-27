import React from 'react'
import {connect} from 'react-redux'

const Notification = ({ notification }) => {
    if (!notification) {
        return null
    }

    return (
        <div className="notification">
            {notification}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps, null)(Notification)