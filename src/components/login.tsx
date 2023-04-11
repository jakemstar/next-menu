import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div>
            <button onClick={() => void signIn("google")}>Sign in</button>
        </div>
    )
}
