import React from 'react'

const Notification = ({notification}) => {
    if(notification !== '') {
        return (
            <p>{notification}</p>
        )
    } else { return null}
}

export default Notification