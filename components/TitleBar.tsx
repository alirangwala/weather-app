import React from 'react'
import Login from './Login'

const TITLE_COPY = "What is the Weather?"

const TitleBar = () => {
  return (
    <div className="navbar bg-secondary-content">
        <div className="navbar-end text-3xl font-bold text-primary">{TITLE_COPY}</div>
        <div className="navbar-end">
            <Login />
            <div className="btn btn-secondary">Settings</div>
        </div>
    </div>
  )
}

export default TitleBar