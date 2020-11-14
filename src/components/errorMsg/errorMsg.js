import React from 'react'
import img from './5cdbf84a93a152102c1ac8f6.jpg'
import './errorMsg.css'

const ErrorMsg = () => {
    return (
        <>
            <img className="imgs"src={img} alt="error"/><br/>
            <span>Oops something went wrong</span>
        </>
    )
}

export default ErrorMsg;