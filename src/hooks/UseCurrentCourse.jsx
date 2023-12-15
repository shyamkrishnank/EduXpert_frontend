import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentCourse } from '../Slices/CourseIdSlice'
import { API_URL } from '../constants/url'
import axios from 'axios'


function UseCurrentCourse(id) {
   const [course,setCourse] = useState("")
   useEffect(()=>{
        axios.get(`${API_URL}/course/get_course/${id}`)
        .then(response=>{
            setCourse(response.data)
            console.log(response.data)
        })
        .catch(error=>[
            console.log(error.message)
        ])
    
     },[])
    return [course,setCourse]
}

export default UseCurrentCourse
