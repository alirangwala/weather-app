"use client"
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"

const Login = () => {
    const { data: session } = useSession();
    return (
        < div>
            {session ? (
                <>
                    <h1>
                        Welcome {session.user?.name}
                    </h1>
                    <button className="btn btn-secondary" onClick={() => signOut()}>Sign Out</button>
                </>
            ) : (
                <>
                    <h1>
                        You are not logged in
                    </h1>
                    <div>
                        <button className="btn btn-secondary" onClick={() => signIn("google")}>Sign In</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Login