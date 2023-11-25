import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogged : false,
    isStaff : false

}

const authSlice = createSlice({
    name : 'Auth',
    initialState,
    reducers : {
        logged : ( state,action )=>{
            state.isLogged = action.payload.isLogged?action.payload.isLogged:true
            state.isStaff = action.payload.is_staff == true ? true : false 
            localStorage.setItem('auth_token',JSON.stringify(action.payload))
        },
        logout : ()=> initialState
        
    }
})

export default authSlice.reducer
export const { logged,logout } = authSlice.actions

