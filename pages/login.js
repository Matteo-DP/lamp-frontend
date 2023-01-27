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
        <main className='bg-bgdark w-screen h-screen flex justify-center items-center'>
            <div className='bg-bgdark sm:border sm:border-bglight sm:shadow-2xl w-full max-w-sm px-8 py-8 rounded-xl'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-2xl text-accentpurple mb-8 text-center'>Please <strong>login</strong> to continue</h1>
                    <p className='text-textlight mb-2'>
                        Email:
                    </p>
                    <input type="email" className='mb-4 w-full px-4 py-2 rounded-sm' ref={emailRef} required placeholder='example@mail.com' />
                    <br />
                    <p className='text-textlight mb-2'>
                        Password:
                    </p>
                    <input type="password" className='mb-4 w-full px-4 py-2 rounded-sm' ref={passwordRef} required placeholder="●●●●●"/>
                    <br />
                    <button type='submit' disabled={loading}
                        className='px-4 py-2 bg-accentpurple rounded-xl text-textlight mt-8'
                    >
                        Login
                    </button>
                    {error && 
                        <p className='text-accentred absolute'>{error}</p>
                    }
                </form>
            </div>
        </main>
  )
}
