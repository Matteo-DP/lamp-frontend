import React, { useState, useRef } from 'react'
import { useAuth } from '../src/contexts/AuthContext';
import { useRouter } from "next/router"


export default function Login() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth()
    const router = useRouter()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        try {
            await login(emailRef.current.value, passwordRef.current.value)
            router.push("/")
            setLoading(false)
        } catch {
            setError("Invalid email or password")
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <p>Email:</p>
            <input type="text" className='bg-zinc-100' ref={emailRef} />
            <br />
            <p>Password:</p>
            <input type="password" className='bg-zinc-100' ref={passwordRef} />
            <br />
            <button type='submit' disabled={loading}>Login</button>
        </form>
  )
}
