'use client'
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


    useEffect(() => {
        if (city) {
            fetchWeather();
        }
    }, [city]);

    const fetchWeather = async () => {
        try {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WEATHERSTACK_API_KEY}&query=${city}`);
            const data = await response.json();
            if (data.error) {
                setError("Please enter a valid location");
            } else {
                console.log(data)
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
            setError(`Failed to fetch weather data: ${err}`);
        }
    };

    return (
        <div>
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : weatherData ? (
                <ul>
                    <li>Location: {weatherData.city}, {weatherData.country}</li>
                    <li>Temperature: {weatherData.temperature}°C</li>
                    <li>Wind Speed: {weatherData.wind_speed} km/h</li>
                    <li>Pressure: {weatherData.pressure} hPa</li>
                    <li>Precipitation: {weatherData.precip} mm</li>
                    <li>Humidity: {weatherData.humidity}%</li>
                    <li>Cloud Cover: {weatherData.cloudcover}%</li>
                    <li>Feels Like: {weatherData.feelslike}°C</li>
                    <li>UV Index: {weatherData.uv_index}</li>
                    <li>Visibility: {weatherData.visibility} km</li>
                </ul>
            ) : (
                <div>Loading weather data...</div>
            )}
        </div>
    )
}

export default WeatherDisplay