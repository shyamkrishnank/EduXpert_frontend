import React, { useState } from 'react'
import Navbar1 from '../../components/Navbar'
import {CardHeader, Input ,Card, CardBody} from "@nextui-org/react"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_URL } from '../../constants/url';
import { useDispatch } from 'react-redux';
import { logged } from '../../Slices/AuthSlice'; 
import { useNavigate } from 'react-router-dom';
import GoogleBtn from '../../components/google/GoogleBtn';


function LoginPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const naviate = useNavigate()
    const handleSubmit =  () =>{
        if ( email === "" || password === "" ){
            toast.success('Successfully LoggedIn', {
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
      const data = {
            'email':email,
            'password':password,
        }
        axios.post(`${API_URL}/users/login/`,data)
        .then(response=>{
           toast.success('All fields required!', {
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
                naviate('/instructor')
            }
            else{
                naviate('/user')
            }
        })
        .catch(error=>{
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
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
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
        <div className='w-full justify-self-center'> <GoogleBtn /> </div>
        
      </Card>
    </div>
    </div>
  )
}

export default LoginPage
