import {Outlet, Navigate,} from 'react-router-dom'
import { useDispatch, } from 'react-redux'
import { useState } from 'react'
import { logged } from '../Slices/AuthSlice'

const PrivateRoute = ()=>{  
    const dispatch = useDispatch()
    const[user] = useState(localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null)
    if (user){
    if (user.is_staff){
       dispatch(logged(user))
    return(
       <Navigate  to='instructor' /> 
       )
    }
    else {
        dispatch(logged(user))
        return(
        <Navigate  to='user' />
        )
       
    }
    }
    else{
        return(
            <Outlet />
        )
        
    }
}
    
export default PrivateRoute