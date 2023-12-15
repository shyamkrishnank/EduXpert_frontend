import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    course_id : "",
    course_details : []
}


const AdminCourseSlice = createSlice({
    name : 'AdminCourse',
    initialState,
    reducers:{
        clickedCourse :(state,action)=>{
            state.course_id = action.payload.id
            state.course_details = action.payload
        }
    }
})

export default AdminCourseSlice.reducer
export const { clickedCourse } = AdminCourseSlice.actions