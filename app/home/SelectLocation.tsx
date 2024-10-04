'use client'
import React, {useState} from 'react'

const SelectLocation = () => {
    const [location, setLocation] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted value:", location);
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Enter a City:
      <input 
        type="text" 
        value={location} 
        onChange={handleChange} 
      />
    </label>
    <button type="submit">Submit</button>
  </form>
  )
}

export default SelectLocation