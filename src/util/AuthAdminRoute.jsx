import React from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AuthAdminAuth() {
  const user = useSelector(state=>state.auth.user)
  if (!user){
  return  <Navigate to='/home'/>
  }
  else{
    if (!user.is_admin){
      return <Navigate to='/instructor' />
    }
    else{
      return <Outlet />
    }
  }
}

export default AuthAdminAuth
