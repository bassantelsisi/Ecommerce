import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Guard({children}) {
    const token = localStorage.getItem('token')
    return <>
        {token ? children : <Navigate to='/login'/>}
    </>
}

export default Guard