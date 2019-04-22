import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1
  }

  if (props.notifications.length === 0) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div style={style}>
      {renderNotification(props.notifications)}
    </div>
  )
}

const renderNotification = (notifications) => {
  // render the newest notification
  const max = notifications.reduce((prev, current) => {
    return (prev.id > current.id) ? prev : current
  })
  return max.content
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps, null)(Notification)
