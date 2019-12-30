import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({notification}) => {
    if(notification !== '') {
        return (
            <Message success>{notification}</Message>
        )
    } else { return null}
}

export default Notification