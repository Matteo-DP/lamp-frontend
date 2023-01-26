import { useRouter } from 'next/router';
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function PrivateRoute({ children }) {

    const { currentUser } = useAuth();
    const router = useRouter();

    if(!currentUser) {
        router.push("/login")
    } else {
        return(
            children
        )
    }
}