import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants/url'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse } from '../Slices/CourseIdSlice'

function UseInsCourse() {
    const dispatch = useDispatch()
    const [courses,setCourses] = useState([])
    const id = useSelector(state=>state.auth.logged_id)
    useEffect(()=>{
        dispatch(deleteCourse())
        axios.get(`${API_URL}/course/ins_course/${id}`)
        .then(response=>{
            setCourses(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
  return courses
  
}

export default UseInsCourse
