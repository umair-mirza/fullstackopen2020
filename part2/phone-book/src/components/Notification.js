import React from 'react'
import './notification.css'

const Notification = ({message, error}) => {
    if(message === null) {
        return null
    }
    
    if(message && error === false) {
        return (
            <div className="message">
                {message}
            </div>
        )
    }

    else {
        return (
            <div className="errormessage">
                {message}
            </div>
        )
    }
}

export default Notification