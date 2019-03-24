import React from 'react';

const Notification = ({ message, type }) => {
    const errorStyle = {
        color: 'red',
        padding: '0px 5px',
        border: '3px solid red',
        marginBottom: '10px'
    };

    const messageStyle = {
        color: 'green',
        padding: '0px 5px',
        border: '3px solid green',
        marginBottom: '10px'
    };

    if(message === null) {
        return null;
    }

    return (
        <div style={type === 2 ? errorStyle : messageStyle}>
            <p>{message}</p>
        </div>
    )
}

export default Notification