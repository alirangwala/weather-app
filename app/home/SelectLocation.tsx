'use client'
import React, { useState } from 'react'
import WeatherDisplay from './WeatherDisplay';
import { useSession } from 'next-auth/react';

const SelectLocation = () => {
    const [input, setInput] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const { data: session } = useSession();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const setLocationToUser = async(location: string, email: string) => {
        const updated_data = {
            "lastCity": location
          }
        try {
            const response = await fetch('http://localhost:8080/user', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updated_data),
            });
          } catch (error) {
            console.error('Error updating data:', error);
          }
        };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocation(input)
        if (session && session.user?.email) {
            setLocationToUser(location, session.user.email)
        }
        console.log("Submitted value:", location);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="">
                <label className = "form-control w-full max-w-xs pl-20">
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
                <div className = "pl-10">
                    <WeatherDisplay city={location}/>
                </div>
            ) 
        }
        </div>
        )
    }
export default SelectLocation