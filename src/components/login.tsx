import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <>
            <button onClick={() => void signIn()}>Sign in</button>
        </>
    )
}
