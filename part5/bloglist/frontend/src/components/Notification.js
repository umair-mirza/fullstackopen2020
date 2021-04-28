import React from 'react'
import './notification.css'

const Notification = ({message, error}) => {
    if(message === null && error === null) {
        return null
    }
    if(message && error === null) {
        return (
        <div className="message">{message}</div>
        )
    }
    return (
        <div className="errormsg">{error}</div>
    )
}

export default Notification