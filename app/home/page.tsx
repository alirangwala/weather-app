import React from 'react'
import SelectLocation from './SelectLocation'
import Login from '@/components/Login'
import TitleBar from '@/components/TitleBar'

const Home = () => {
    return (
        <div >
            <TitleBar />
            <div className="flex bg-primary-content">
                <SelectLocation />
            </div>
        </div>
    )
}

export default Home