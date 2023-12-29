import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/AxiosInstance'


function UseCurrentCourse(id) {
   const [course,setCourse] = useState([])
   useEffect(()=>{
        axiosInstance.get(`/course/get_course/${id}`)
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
