"use client"
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"

const Login = () => {
    const { data: session } = useSession();
    return (
        < div className = "m-2">
            {session ? (
                <>
                    <button className="btn btn-secondary" onClick={() => signOut()}>Sign Out</button>
                </>
            ) : (
                <>
                    <div>
                        <button className="btn btn-secondary" onClick={() => signIn("google")}>Sign In</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Login