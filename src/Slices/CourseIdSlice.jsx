import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id : "",
    title :"",
    description:""
}


const CourseIdSlice = createSlice({
    name : 'course_id',
    initialState,
    reducers : {
        currentCourse : (state,action)=>{
            state.id = action.payload.id,
            state.title = action.payload.course_title,
            state.description = action.payload.description
        }
    }

})

export default CourseIdSlice.reducer
export const { currentCourse } = CourseIdSlice.actions