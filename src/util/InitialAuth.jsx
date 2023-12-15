import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function InitialAuth() {
    const user = useSelector(state=>state.auth.user)
    return user ? <Navigate to='/user' /> : <Outlet />
}

export default InitialAuth
