import React from 'react';

const Notification = ({ notifications }) => {
  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1
  }

  const renderNotification = (notifications) => {
    // render the newest notification
    const max = notifications.reduce((prev, current) => {
      return (prev.id > current.id) ? prev : current
    })
    return max.content
  }

  return (
    <div style={style}>
      {renderNotification(notifications)}
    </div>
  )
}

export default Notification
