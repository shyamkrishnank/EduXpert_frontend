import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { API_URL } from '../constants/url'
import { useSelector } from 'react-redux'
import axios from 'axios'

function UseProfile() {
    const id = useSelector(state=>state.auth.logged_id)
    const [userData,setUserData] = useState('')
    useEffect(()=>{
         axios.get(`${API_URL}/users/profile/${id}`)
        .then(response=>{
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
