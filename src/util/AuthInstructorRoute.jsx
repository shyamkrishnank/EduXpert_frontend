import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { logged } from '../Slices/AuthSlice'
import InstructorNav from '../components/instructor/InstructorNav'
import Sidebar from '../components/instructor/Sidebar'

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

          return <>
              <InstructorNav />
              <Sidebar />
              <Outlet />
            </>
          
        }
    }   
  
}

export default AuthInstructorRoute
