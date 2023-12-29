import React from 'react'
import {GoogleLogin } from "@react-oauth/google"
import { useGoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logged } from '../../Slices/AuthSlice'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react';
import { FcGoogle } from "react-icons/fc";
import axiosInstance from '../../axios/AxiosInstance';


function GoogleBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login =  useGoogleLogin({
      onSuccess:token=>{
        console.log(token)
        axiosInstance.post('/users/googlelogin/', token.access_token)
        .then(response=>{
          dispatch(logged(response.data))
          if(response.data.is_staff){
            navigate('/instructor')
          }
          else{
            navigate('/user')
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      onError:error=>{
        console.log(error)
      }
    })
  return (
        <Button startContent={<FcGoogle size={25} />} color='' onClick={login} > Sign in with Google</Button>

  )
}

export default GoogleBtn
