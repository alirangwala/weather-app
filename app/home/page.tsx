import React from 'react'
import SelectLocation from './SelectLocation'
import TitleBar from '@/components/TitleBar'
import WeatherDisplay from './WeatherDisplay'

const INSTRUCTION_COPY = "Welcome to your weather app. Please enter a city to the left to discover the weather. If you would like to change your API key or URL please press the settings icon in the top right corner"
const Home = () => {
    return (
        <div className="bg-primary-content">
            <TitleBar />
            <div className="flex">
                <div className=" h-64 w-1/3 bg-white shadow-lg rounded-lg p-6 text-gray-700 m-4">
                    <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                    <p>{INSTRUCTION_COPY}</p>
                </div>
                <SelectLocation />
            </div>
            <div className = "flex">
                    <WeatherDisplay city="ST. Louis" />
                    <WeatherDisplay city="New York" />
                    <WeatherDisplay city="San Diego"/>
            </div>
        </div>
    )
}

export default Home