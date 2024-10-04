import React from 'react'
import {signIn, useSession} from "next-auth/react"

const Login = () => {
    const { data: session } = useSession();
  return (
    <>
    {session ? (
        <h1>

        </h1>
    ) : (
        <h1>

        </h1>
    )
    }
    </>
  )
}

export default Login