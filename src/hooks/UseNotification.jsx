import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/AxiosInstance'

function UseNotification() {
    const[notification, setNotification] = useState([ ])
    useEffect(()=>{
        axiosInstance.get('/notifications')
        .then(response=>{
            setNotification(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
  return (
    [notification,setNotification]
  )
}

export default UseNotification
