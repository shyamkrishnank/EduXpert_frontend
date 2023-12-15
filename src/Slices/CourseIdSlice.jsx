import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id : localStorage.getItem('inc_course')?localStorage.getItem('inc_course'):null
}


const CourseIdSlice = createSlice({
    name : 'course_id',
    initialState,
    reducers : {
        currentCourse : (state,action)=>{ 
            state.id = action.payload.id,
            state.course_title = action.payload.course_title,
            state.course_description = action.payload.course_description   
        },

        deleteCourse : ()=> initialState 
    }

})

export default CourseIdSlice.reducer
export const { currentCourse,deleteCourse } = CourseIdSlice.actions