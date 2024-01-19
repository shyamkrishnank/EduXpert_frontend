import React, { useState } from 'react'
import Navbar1 from '../../components/user/Navbar'
import {CardHeader, Input ,Card, CardBody} from "@nextui-org/react"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../constants/url';
import { useDispatch } from 'react-redux';
import { logged } from '../../Slices/AuthSlice'; 
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import GoogleBtn from '../../components/google/GoogleBtn';
import axiosInstance from '../../axios/AxiosInstance';
import { end_loading, loading } from '../../Slices/LodingSlice';


function LoginPage() {
    const { state } = useLocation()
    const [email,setEmail] = useState(state?state.data.email:"")
    const [password,setPassword] = useState(state?state.data.password:"")
    const dispatch = useDispatch()
    const naviate = useNavigate()
    const handleSubmit =  () =>{
        if ( email === "" || password === "" ){
            toast.error('Please enter valid details ', {
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
          dispatch(loading())
      const data = {
            'email':email,
            'password':password,
        }
        axiosInstance.post(`/users/login/`,data)
        .then(response=>{
            dispatch(logged(response.data))
            toast.success('Successfully Signed In', {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
              }
              );
            if (response.data.is_staff){
                dispatch(end_loading())
                naviate('/instructor')
            }
            else{
                dispatch(end_loading())
                naviate('/user')
            }
        }
        )
        .catch(error=>{
            dispatch(end_loading())
            toast.error(`${error.response.data.detail}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        })
    }


    }
  return (
    <div>
        <Navbar1 />
    <div className='flex justify-center items-center min-h-screen bg-[url("/loginbackground.jpg")] bg-no-repeat bg-cover'>
      <Card className='max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md'>
        <CardHeader>
          <h1 className='font-bold text-2xl text-center text-blue-600 mb-4'>Login</h1>
        </CardHeader>
        <CardBody>
          <Input className='my-1'value= {email} onChange={e=>setEmail(e.target.value)}  size={'md'} type="email" label="Email" required/>
          <Input className='my-1' value= {password} onChange={e=>setPassword(e.target.value)}  size={'md'} type="password" label="Password" required/>
        </CardBody>
        <div className='mt-6'>
          <button onClick={handleSubmit}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            type='button'
          >
            Sign In
          </button>
          <h1 className='text-green-950 text-xl font-medium my-1'>OR</h1>
        </div>
        <div className='w-full justify-self-center'> <GoogleBtn url={'/users/googlelogin/'} isLogin={true}/> </div>
        <div className='text-sm text-danger-500'> <Link to={'/forget_password'}>Forget Password?</Link></div>
        
      </Card>
    </div>
    </div>
  )
}

export default LoginPage
