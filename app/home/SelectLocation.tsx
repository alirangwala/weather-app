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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(input)
    console.log("Submitted value:", location);
  };

  return (
    <div className="flex w-2/3">
      <div className="h-64 w-1/2 bg-white shadow-lg rounded-lg p-8 m-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-lg font-bold text-gray-700 ">Enter a City</span>
            <input
              type="text"
              list="city-options"
              value={input}
              onChange={handleChange}
              placeholder="Type here"
              className="mt-2 input input-bordered w-full text-gray-700 placeholder-gray-400"
            />
            <datalist id="city-options">
              <option value="Tokyo"></option>
              <option value="Delhi"></option>
              <option value="Shanghai"></option>
              <option value="São Paulo"></option>
              <option value="Mexico City"></option>
              <option value="Cairo"></option>
              <option value="Mumbai"></option>
              <option value="Beijing"></option>
              <option value="Dhaka"></option>
              <option value="Osaka"></option>
            </datalist>
          </label>
          <div className="text-right">
            <button className="btn btn-primary px-6 py-2">View Weather</button>
          </div>
        </form>
      </div>

      {location && (
        <div className="w-1/2">
          <WeatherDisplay city={location} />
        </div>
      )}
    </div>
  );
};
export default SelectLocation