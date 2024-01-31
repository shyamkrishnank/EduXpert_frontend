import React from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'
import AdminSideBar from '../components/admin/AdminSideBar'

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

      return(
        <>
        <AdminNav />
        <AdminSideBar />
        <Outlet />
        </>
       
      )
      
    }
  }
}

export default AuthAdminAuth
