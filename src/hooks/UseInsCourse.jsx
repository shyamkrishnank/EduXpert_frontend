import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants/url'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse } from '../Slices/CourseIdSlice'
import { FaCommentSlash } from 'react-icons/fa'

function UseInsCourse() {
    const dispatch = useDispatch()
    const [courses,setCourses] = useState([])
    const id = useSelector(state=>state.auth.id)
    console.log(id)
    useEffect(()=>{
        dispatch(deleteCourse())
        axios.get(`${API_URL}/course/ins_course/${id}`)
        .then(response=>{
            setCourses(response.data)
        })
        .catch(error=>{
            setCourses([])
        })
    },[])

  return courses
  
}

export default UseInsCourse
