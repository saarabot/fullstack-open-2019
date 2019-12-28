import React from 'react';
import { connect } from 'react-redux';
import { nullNotification } from '../reducers/notificationReducer';

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.notifications;
  let message = '';
  
  if(!notification.action) {
    return null;
  } else if(notification.action === 'add') {
    message = `you added '${notification.anecdote}'`
  } else {
    message = notification.message
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = {
  nullNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)