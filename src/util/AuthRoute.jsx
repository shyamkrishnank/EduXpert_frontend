import React from 'react'
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { logged } from "../Slices/AuthSlice"

 const AuthRoute = () =>{
    const dispatch = useDispatch()
    const user = localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null

    dispatch(logged(user))
    return(
            <Outlet />
          )
 }

 export default AuthRoute