"use client"
import { signIn } from 'next-auth/react';


export default function Github() {
    return (
     <button onClick={() => signIn("google",{callbackUrl:'http://localhost:3000/profile'})}>Google</button>
    )
}