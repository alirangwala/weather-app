'use client'
import { decrypt } from '@/server/encryption';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'

interface WeatherDisplayProps {
    city: string;
}

interface WeatherObj {
    city: string;
    country: string;
    temperature: number;
    wind_speed: number;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
}

const defaultWeatherObj = {
    city: "",
    country: "",
    temperature: 0,
    wind_speed: 0,
    pressure: 0,
    precip: 0,
    humidity: 0,
    cloudcover: 0,
    feelslike: 0,
    uv_index: 0,
    visibility: 0
}
const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<WeatherObj>(defaultWeatherObj);
    const [error, setError] = useState<string | null>(null);

    const { data: session } = useSession();


    useEffect(() => {
        if (city) {
            fetchWeather();
        }
    }, [city]);

    const fetchWeather = async () => {
        try {

            const response = session ? await fetch(`${session?.apiUrl}?access_key=${decrypt(session?.apiKey)}&query=${city}`) :
                await fetch(`${process.env.NEXT_PUBLIC_WEATHERSTACK_API_URL}?access_key=${process.env.NEXT_PUBLIC_WEATHERSTACK_API_KEY}&query=${city}`)
            const data = await response.json();
            if (data.error) {
                setError("Please enter a valid location");
            } else {
                let formattedData: WeatherObj = {
                    city: data.location.name,
                    country: data.location.country,
                    temperature: data.current.temperature,
                    wind_speed: data.current.wind_speed,
                    pressure: data.current.pressure,
                    precip: data.current.precip,
                    humidity: data.current.humidity,
                    cloudcover: data.current.cloudcover,
                    feelslike: data.current.feelslike,
                    uv_index: data.current.uv_index,
                    visibility: data.current.visibility,
                }
                setWeatherData(formattedData);
                setError(null);
            }
        } catch (err) {
            setError(`Failed to fetch weather data ${err}`);
        }
    };

    return (
        <div className="h-64 bg-white shadow-lg rounded-lg p-8 m-4 break-words text-ellipsis">
            {error ? (
                <div className="text-red-500 text-center mb-4">{error}</div>
            ) : weatherData ? (
                <>
                    <div className="text-center text-2xl font-bold mb-6">
                        {weatherData.city}, {weatherData.country}
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-gray-700">
                        <ul>
                            <li>Temperature: {weatherData.temperature}°C</li>
                            <li>Wind Speed: {weatherData.wind_speed} km/h</li>
                            <li>Pressure: {weatherData.pressure} hPa</li>
                            <li>Precipitation: {weatherData.precip} mm</li>
                        </ul>
                        <ul>
                            <li>Humidity: {weatherData.humidity}%</li>
                            <li>Cloud Cover: {weatherData.cloudcover}%</li>
                            <li>Feels Like: {weatherData.feelslike}°C</li>
                            <li>UV Index: {weatherData.uv_index}</li>
                            <li>Visibility: {weatherData.visibility} km</li>
                        </ul>
                    </div>
                </>
            ) : (
                <div>Loading weather data...</div>
            )}
        </div>
    )
}

export default WeatherDisplay