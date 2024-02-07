import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import axiosInstance from '../axios/AxiosInstance'
import { end_loading, loading } from '../Slices/LodingSlice'


function UseCurrentChapter(id) {
   const [course,setCourse] = useState("")
   const dispatch = useDispatch()
   useEffect(()=>{
        dispatch(loading())
        axiosInstance.get(`/course/ins_chapter/${id}`)
        .then(response=>{
            dispatch(end_loading())
            setCourse(response.data)
        })
        .catch(error=>{
            dispatch(end_loading())
            console.log(error.message)
         })
    
     },[])
    return [course,setCourse]
}

export default UseCurrentChapter
