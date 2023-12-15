import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

 const AuthUserRoute = () =>{
    const user = useSelector(state=>state.auth.user)
    if (!user){
    return  <Navigate to='/home'/>
    }
    else{
      if (user.is_staff){
        return <Navigate to='/instructor' />
      }
      else if (user.is_admin){
        return <Navigate to='/eduadmin' />
      }
      else{
        return <Outlet />
      }
    }
 }

 export default AuthUserRoute