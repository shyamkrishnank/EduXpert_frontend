import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/AxiosInstance'
import { useDispatch } from 'react-redux'
import { end_loading, loading } from '../Slices/LodingSlice'


function UseCurrentCourse(id) {
   const [course,setCourse] = useState("")
   const dispatch = useDispatch()
   useEffect(()=>{
        dispatch(loading())
        axiosInstance.get(`/course/get_course/${id}`)
        .then(response=>{
            setCourse(response.data)
            dispatch(end_loading())
        })
        .catch(error=>{
            dispatch(end_loading())
        })
    
     },[])
    return [course,setCourse]
}

export default UseCurrentCourse
