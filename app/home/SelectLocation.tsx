'use client'
import React, { useEffect, useState } from 'react'
import WeatherDisplay from './WeatherDisplay';
import { useSession } from 'next-auth/react';

const SelectLocation = () => {
  const [input, setInput] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const { data: session } = useSession();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const setLocationToUser = async (location: string, email: string) => {
    const updated_data = {
      "lastCity": location
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}lastCity?email=${email}`, {
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

  const getUsersLastLocation = async (email: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );
      if (response.status === 404) {
        console.log(`No user found with email: ${email}`);
        setInput('');
        setLocation('');
        return;
      }
      const data = await response.json()
      setInput(data.lastCity)

    } catch (error) {
      console.error(error);
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(input)
    if (session && session.user?.email) {
      await setLocationToUser(input, session.user.email)
    }
    console.log("Submitted value:", location);
  };

  useEffect(() => {
    if (session && session.user?.email) {
      getUsersLastLocation(session.user.email)
    }
  }, [session]);

  return (
    <div className = "flex">
      <div className="h-64 w-/3 bg-white shadow-lg rounded-lg p-8 m-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-lg font-bold text-gray-700 ">Enter a City</span>
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Type here"
              className="mt-2 input input-bordered w-full text-gray-700 placeholder-gray-400"
            />
          </label>
          <div className="text-right">
            <button className="btn btn-primary px-6 py-2">View Weather</button>
          </div>
        </form>
      </div>

      {location && (
        <div className="h-64 bg-white shadow-lg rounded-lg p-8 m-4 ">
          <WeatherDisplay city={location} />
        </div>
      )}
    </div>
  );
};
export default SelectLocation