import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { API_URL } from '../constants/url'
import { useSelector } from 'react-redux'
import axiosInstance from '../axios/AxiosInstance'

function UseProfile() {
    const id = useSelector(state=>state.auth.id)
    const [userData,setUserData] = useState('')
    useEffect(()=>{
         axiosInstance.get(`${API_URL}/users/profile/${id}`)
        .then(response=>{
            console.log(response.data)
            setUserData(response.data)
        })
        .catch(error=>{
            console.log("hi",error.message)
        })
     },[])
  return [
      userData,setUserData
  ]
  
}

export default UseProfile
