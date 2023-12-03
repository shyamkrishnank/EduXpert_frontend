import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentCourse } from '../Slices/CourseIdSlice'
import { API_URL } from '../constants/url'
import axios from 'axios'


function UseCurrentCourse() {
   const dispatch = useDispatch()
   const current = useSelector(state=>state.currentCourse)
   const [course,setCourse] = useState(current)
   useEffect(()=>{
    if (current.id == ""){
        const id = localStorage.getItem('course_id')
        axios.get(`${API_URL}/course/get_course/${id}`)
        .then(response=>{
            dispatch(currentCourse(response.data))
            setCourse(response.data)
            console.log(response.data)
        })
        .catch(error=>[
            console.log(error.message)
        ])
    }
     },[])
    return [course,setCourse]
}

export default UseCurrentCourse
