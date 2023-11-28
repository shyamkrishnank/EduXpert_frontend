import { createSlice } from '@reduxjs/toolkit'
import {jwtDecode} from "jwt-decode"

const initialState = {
    isLogged : false,
    isStaff : false,
    logged_id : ""

}

const authSlice = createSlice({
    name : 'Auth',
    initialState,
    reducers : {
        logged : ( state,action )=>{
            state.isLogged = action.payload.isLogged?action.payload.isLogged:true
            state.isStaff = action.payload.is_staff == true ? true : false 
            state.logged_id = jwtDecode(JSON.stringify(action.payload)).user_id
            localStorage.setItem('auth_token',JSON.stringify(action.payload))
        },
        logout : ()=> initialState
        
    }
})

export default authSlice.reducer
export const { logged,logout } = authSlice.actions

