import React from 'react'

import { Navigate } from 'react-router-dom';

function AuthGuard({children}) {
    const token = localStorage.getItem('token')
    return <>
        {token ? <Navigate to="/"/> : children}
    </>
}

export default AuthGuard