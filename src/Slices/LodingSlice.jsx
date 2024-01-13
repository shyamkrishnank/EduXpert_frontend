import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loading : true
}


const loddingSlice = createSlice({
    name : 'loading',
    initialState,
    reducers : {
        loading : (state)=>{
            state.loading = true
        },
        end_loading : (state)=>{
              state.loading = false
        }

    }
})

export default loddingSlice.reducer
export const { loading,end_loading } = loddingSlice.actions