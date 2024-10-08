"use client"
import { createContext, useContext, useState } from 'react'

type Context = {
    api_key: string
    api_url: string

}
const AppContext = createContext<any>(undefined)


export function AppWrapper ({ children }: { children: React.ReactNode }) {

    let [state, setState] = useState<Context>({
        "api_key": process.env.NEXT_PUBLIC_WEATHERSTACK_API_KEY || "",
        "api_url": process.env.NEXT_PUBLIC_WEATHERSTACK_API_URL || ""
    })

    const changeApiKey = (key: string) => setState({...state, "api_key": key})
    const changeApiUrl = (url: string) => setState({...state, "api_url": url})


    return <AppContext.Provider value={{state, changeApiKey, changeApiUrl}}>{children}</AppContext.Provider>
}

export function useAppContext() {
    return useContext(AppContext)
}