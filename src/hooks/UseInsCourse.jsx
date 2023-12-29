import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants/url'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse } from '../Slices/CourseIdSlice'
import { FaCommentSlash } from 'react-icons/fa'
import axiosInstance from '../axios/AxiosInstance'

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
