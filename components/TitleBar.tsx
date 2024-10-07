import React from 'react'
import Login from './Login'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import Settings from './Settings'

const TITLE_COPY = "What is the Weather?"

const TitleBar = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="navbar bg-secondary-content py-4 px-6 shadow-md flex justify-between items-center">
            <div className="text-3xl font-bold text-center flex-grow">
                {session ? `Welcome, ${session.user!.name}!` : ''}
            </div>
            <div className="text-3xl font-bold text-center flex-grow">
                {TITLE_COPY}</div>
            <div className="flex items-center space-x-4">
                <Login />
                <Settings />
            </div>
        </div>
    )
}

export default TitleBar