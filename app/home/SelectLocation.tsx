'use client'
import React, { useState } from 'react'
import WeatherDisplay from './WeatherDisplay';

const SelectLocation = () => {
    const [input, setInput] = useState<string>('');
    const [location, setLocation] = useState<string>('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocation(input)
        console.log("Submitted value:", location);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="">
                <label className = "form-control w-full max-w-xs">
                    <span className = "text-secondary">Enter a City</span>
                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Type here"
                        className = "input input-bordered w-full max-w-xs text-secondary"
                    />
                    <button className="btn btn-primary" type="submit">View Weather</button>
                </label>
            </form>
            {location && (
                <>
                <WeatherDisplay city={location}/>
                </>
            ) 
        }
        </>
        )
    }
export default SelectLocation