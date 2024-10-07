import React from 'react'
import Login from './Login'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import Settings from './Settings'

const TITLE_COPY = "What is the Weather?"

const TitleBar = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="navbar bg-secondary-content">
            {session && <div className="text-3xl font-bold text-primary">Welcome {session.user!.name} !</div>} 
            <div className="navbar-end text-3xl font-bold text-primary">{TITLE_COPY}</div>
            <div className="navbar-end">
                <Login/>
                <Settings />
            </div>
        </div>
    )
}

export default TitleBar