import React from 'react'
import SelectLocation from './SelectLocation'
import TitleBar from '@/components/TitleBar'

const Home = () => {
    return (
        <div >
            <TitleBar />
            <div className="flex bg-primary-content">
                <div>Instructions here</div>
                <SelectLocation />
            </div>
        </div>
    )
}

export default Home