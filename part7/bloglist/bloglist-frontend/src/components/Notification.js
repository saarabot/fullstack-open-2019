import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ type, message }) => {
    console.log(type, message);
    let style = {};
    if(type === 'error') {
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
    if(message === null) {
        return null;
    }
    return (
        <div style={style}>
            {message}
        </div>
    )
};

Notification.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default Notification;