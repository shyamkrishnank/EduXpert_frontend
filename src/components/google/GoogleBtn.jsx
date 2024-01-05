import React, { useState } from 'react'
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
import IsStaffModal from '../../contents/modals/IsStaffModal';


function GoogleBtn({url,isLogin}) {
  const navigate = useNavigate()
  const[modal,setModal] = useState(false)
  const dispatch = useDispatch()
  const [user,setUser] = useState()
  const login =  useGoogleLogin({
      onSuccess:token=>{
        const data = {'token':token.access_token}
        axiosInstance.post(url, data)
        .then(response=>{
          if (isLogin){
          dispatch(logged(response.data))
          if(response.data.is_staff){
            navigate('/instructor')
          }
          else{
            navigate('/user')
          }
        }
        else{
          if (response.data.message == 'Already have an account'){
            toast.error(response.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }
          else{
            setUser(response.data)
            setModal(true)
          }    
        }
        }
        )
        .catch(error=>{
          console.log(error)
        })
      },
      onError:error=>{
        console.log(error)
      }
    })
  return (
    <>
        <Button startContent={<FcGoogle size={25} />} color='' onClick={login} > Sign in with Google</Button>
        {modal && <IsStaffModal userdetails={user}/>}
    </>    

  )
}

export default GoogleBtn
