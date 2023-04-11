import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
    const { data: session } = useSession();

    if (session) {
        return <div>Welcome, {session.user.email}</div>
    } else {
        return (
            <div>
                <p>You are not signed in</p>
                <button onClick={() => void signIn()}>Sign in</button>
            </div>
        )
    }
}