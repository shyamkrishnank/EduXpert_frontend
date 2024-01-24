import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import AdminCourseSliceReducer from './Slices/AdminCourseSlice'
import LodingSliceReducer from './Slices/LodingSlice'
 

const store = configureStore(
   {
    reducer :{
        auth : authSliceReducer,
        adminCourse : AdminCourseSliceReducer,
        loading : LodingSliceReducer
        
    }
   }
)

export default store