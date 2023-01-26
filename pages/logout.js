import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../src/contexts/AuthContext'

export default function Logout() {

    const { currentUser, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(currentUser) {
            logout().then(() => router.push("/login"))
        } else {
            router.push("/login")
        }
    })
    
    return(
        <div>Redirecting...</div>
    )
}
