import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nullNotification } from '../reducers/notificationReducer';

const Notification = (props) => {
    console.log(props);
    let style = {};
    if(props.notifications.action === 'error') {
        style = {
            'border': '1px solid red',
            'fontWeight': '600',
            'padding': '20px',
            'marginBottom': '10px',
        }
    } else {
        style = {
            'border': '1px solid green',
            'fontWeight': '600',
            'padding': '20px',
            'marginBottom': '10px',
        }
    }
    if(props.notifications.message === '') {
        return null
    }

    return (
        <div style={style}>
            {props.notifications.message}
        </div>
    )
};

const mapStateToProps = state => {
    return {
      notifications: state.notifications
    }
}

const mapDispatchToProps = {
    nullNotification
}


export default connect(mapStateToProps, mapDispatchToProps)(Notification)

