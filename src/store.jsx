import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import CourseIdSliceReducer from './Slices/CourseIdSlice'


const store = configureStore(
   {
    reducer :{
        auth : authSliceReducer,
        currentCourse : CourseIdSliceReducer
        
    }
   }
)

export default store