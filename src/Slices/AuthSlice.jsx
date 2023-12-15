import { createSlice } from '@reduxjs/toolkit'
import {jwtDecode} from "jwt-decode"

const initialState = {
    user : localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null,
    isLogged : false,
    id :localStorage.getItem('auth_token')?jwtDecode(JSON.parse(localStorage.getItem('auth_token')).access_token).user_id:null,
}

const authSlice = createSlice({
    name : 'Auth',
    initialState,
    reducers : {
        logged : (state,action)=>{
            state.user = action.payload
            state.isLogged = true
            state.id = jwtDecode(action.payload.access_token).id
            localStorage.setItem('auth_token',JSON.stringify(action.payload))
        },
        logout : (state)=>{
            state.user = null,
            state.isLogged = false,
            state.id = null
        }
    }
})

export default authSlice.reducer
export const { logged,logout } = authSlice.actions

