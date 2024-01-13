import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import CourseIdSliceReducer from './Slices/CourseIdSlice'
import AdminCourseSliceReducer from './Slices/AdminCourseSlice'
import LodingSliceReducer from './Slices/LodingSlice'
 

const store = configureStore(
   {
    reducer :{
        auth : authSliceReducer,
        currentCourse : CourseIdSliceReducer,
        adminCourse : AdminCourseSliceReducer,
        loading : LodingSliceReducer
        
    }
   }
)

export default store