'use client'
import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { useSession } from 'next-auth/react';

const Settings = () => {
    const { data: session, update } = useSession();

    const [isOpen, setIsOpen] = useState(false);
    const [apiUrlInput, setApiUrlInput] = useState("");
    const [apiKeyInput, setApiKeyInput] = useState("");


    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    const setUserApiInfo = async (email: string) => {
        const update_data = {
            "apiUrl": apiUrlInput,
            "apiKey": apiKeyInput,
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api-info?email=${email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(update_data),
          });
          if (response.ok) {
            update(update_data)
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };

    const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session && session.user?.email) {
            await setUserApiInfo(session.user.email)
          }
        console.log("Submitted API Info");
    };

    const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiUrlInput(e.target.value);
    };
    const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKeyInput(e.target.value);
    };

    return (
        <div className="relative">
            <button
                className="btn btn-secondary m-2 flex items-center justify-center"
                onClick={toggleSettings}
                aria-expanded={isOpen}
                aria-label="Toggle settings"
                disabled = {!session}
            >
                <SettingsIcon />
            </button>


            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
                    <h4 className="text-lg font-semibold mb-2">Settings</h4>
                    <ul>
                        <li className="mb-2">
                            <form onSubmit={handleSettingsSubmit} className="space-y-6">
                                <label className="block">
                                    <span className="m-2 text-md text-gray-700 ">API URL</span>
                                    <input
                                        type="text"
                                        value={apiUrlInput}
                                        onChange={handleApiUrlChange}
                                        placeholder="Type here"
                                        className="input input-bordered w-full text-gray-700 placeholder-gray-400"
                                    />
                                    <span className="m-2 text-md text-gray-700 ">API Key</span>
                                    <input
                                        type="text"
                                        value={apiKeyInput}
                                        onChange={handleApiKeyChange}
                                        placeholder="Type here"
                                        className="input input-bordered w-full text-gray-700 placeholder-gray-400"
                                    />
                                </label>
                                <div className="text-right">
                                <button className="m-2 btn btn-primary px-6 py-2">Submit API Info</button>
                            </div>
                            </form>
                            
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Settings;