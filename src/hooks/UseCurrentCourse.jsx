import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentCourse } from '../Slices/CourseIdSlice'
import { API_URL } from '../constants/url'
import axios from 'axios'


function UseCurrentCourse() {
   const dispatch = useDispatch()
   const title = useSelector(state=>state.currentCourse.title)
   const [courseTitle,setCourseTitle] = useState(title)
   console.log(title)
   useEffect(()=>{
    if (title){
      setCourseTitle(title)
    }
    else{
        const id = localStorage.getItem('course_id')
        axios.get(`${API_URL}/course/get_course/${id}`)
        .then(response=>{
            dispatch(currentCourse(response.data))
            setCourseTitle(response.data.course_title)
        })
        .catch(error=>[
            console.log(error.message)
        ])
    }
     },[])
    return courseTitle
}

export default UseCurrentCourse
