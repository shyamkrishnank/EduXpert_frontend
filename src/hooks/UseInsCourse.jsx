import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/AxiosInstance'
import { useSelector } from 'react-redux'

function UseInsCourse() {
    const [courses,setCourses] = useState([])
    const id = useSelector(state=>state.auth.id)
    useEffect(()=>{
        axiosInstance.get(`/course/ins_course/${id}`)
        .then(response=>{
            setCourses(response.data)
        })
        .catch(error=>{
            setCourses([])
        })
    },[])

  return [courses,setCourses]
  
}

export default UseInsCourse
