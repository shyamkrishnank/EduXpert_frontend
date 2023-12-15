import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { logged } from '../Slices/AuthSlice'

function AuthInstructorRoute() {
    const user = useSelector(state=>state.auth.user)
    console.log(user);
    if (!user){
         return < Navigate to='/home' />
         }
    else{
        if (user.is_admin){
            return <Navigate to='/eduadmin' />
        }
        else if(!user.is_staff){
        return <Navigate to='/user' />
        }
        else{
          return  <Outlet />
        }
    }   
  
}

export default AuthInstructorRoute
