import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import CourseIdSliceReducer from './Slices/CourseIdSlice'
import AdminCourseSliceReducer from './Slices/AdminCourseSlice'


const store = configureStore(
   {
    reducer :{
        auth : authSliceReducer,
        currentCourse : CourseIdSliceReducer,
        adminCourse : AdminCourseSliceReducer
        
    }
   }
)

export default store