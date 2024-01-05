import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentCourse } from '../Slices/CourseIdSlice'
import { API_URL } from '../constants/url'
import axiosInstance from '../axios/AxiosInstance'


function UseCurrentChapter(id) {
   const [course,setCourse] = useState("")
   useEffect(()=>{
        axiosInstance.get(`${API_URL}/course/ins_chapter/${id}`)
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

export default UseCurrentChapter
