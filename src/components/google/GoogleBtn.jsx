import React from 'react'
import {GoogleLogin } from "@react-oauth/google"
import {jwtDecode} from "jwt-decode"
import axios from 'axios'
import { API_URL } from '../../constants/url'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logged } from '../../Slices/AuthSlice'
import { toast } from 'react-toastify'

function GoogleBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
        <GoogleLogin 
            onSuccess={(response)=>{
                    const credential = jwtDecode(response.credential)
                    axios.post(`${API_URL}/users/googlelogin/`,credential)
                    .then(response=>{
                        toast.success('Successfully Logged In!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                      dispatch(logged(response.data))
                      if (response.data.is_staff){
                        navigate('/instructor')

                    }
                    else{
                        navigate('/user')
                    }
                      
                    })
                    .catch(error=>{
                      console.log(error.message)
                    })
                    
                }
                }
            onError={()=>{
                console.log("error occured")}

        } 
        />

  )
}

export default GoogleBtn
