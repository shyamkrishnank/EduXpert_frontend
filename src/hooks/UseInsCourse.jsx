import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { end_loading, loading } from '../Slices/LodingSlice'

function UseInsCourse() {
    const dispatch = useDispatch()
    const [courses,setCourses] = useState([])
    const id = useSelector(state=>state.auth.id)
    useEffect(()=>{
        dispatch(loading())
        axiosInstance.get(`/course/ins_course/${id}`)
        .then(response=>{
            setCourses(response.data)
            dispatch(end_loading())
        })
        .catch(error=>{
            setCourses([])
            dispatch(end_loading())

        })
    },[])

  return [courses,setCourses]
  
}

export default UseInsCourse
